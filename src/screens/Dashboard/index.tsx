import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionsCard, TransactionsCardProps } from '../../components/TransactionCard';
import { useTheme } from 'styled-components';
import { RectButtonProps } from "react-native-gesture-handler";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    User,
    Photo,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LoadContainer

} from './styles';

export interface DataListProsp extends TransactionsCardProps {
    id: string;
}


interface HighlightProps {
    amount: string;
    lastTrasaction: string;
}
interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProsp[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    function getLastTransactionDate(
        collection: DataListProsp[],
        type: 'positive' | 'negative'
    ) {
        const lastTrasaction = new Date(

            Math.max.apply(Math, collection
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime())))

        return `${lastTrasaction.getDate()} de ${lastTrasaction.toLocaleString('pt-BR', { month: 'long' })} `


    }


    async function loadTransactions() {
        const dataKey = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProsp[] = transactions.map(
            (item: DataListProsp) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }


                const amount = Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                const date = Intl.DateTimeFormat('pt-Br', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    date,
                    type: item.type,
                    category: item.category,

                }


            });
        setTransactions(transactionsFormatted);
        const lastTransationEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransationExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransationEntries}`;




        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTrasaction: `Utima entrada dia ${lastTransationEntries}`,

            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }), lastTrasaction: `Utima saida dia ${lastTransationExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }), lastTrasaction: totalInterval,
            },


        })
        setIsLoading(false);
    };

    useEffect(() => {
        loadTransactions()

        // DELETE CADASTRO

    }, []);
    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []))
    return (
        <Container>

            {
                isLoading ? <LoadContainer>
                    <ActivityIndicator color={theme.colors.primiry} size="large" /></LoadContainer> :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: 'https://s2.glbimg.com/rfJUzEWeT37nbe4uPpGen27R_Ew=/0x0:695x520/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/y/r/iR373BQoaZi8ASMsujdA/2015-02-12-imagem38.jpg' }} />
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>Igor</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton onPress={() => { }}>
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>
                        <HighlightCards>
                            <HighlightCard
                                title="Entradas"
                                amount={highlightData.entries.amount}
                                lastTrasaction={highlightData.entries.lastTrasaction}
                                type="up"

                            />
                            <HighlightCard
                                title="Saida"
                                amount={highlightData.expensives.amount}
                                lastTrasaction={highlightData.expensives.lastTrasaction}
                                type="dow"
                            />
                            <HighlightCard
                                title="Saldo"
                                amount={highlightData.total.amount}
                                lastTrasaction={highlightData.total.lastTrasaction}
                                type="total"
                            />
                        </HighlightCards >
                        <Transactions>
                            <Title> Listagem </Title>
                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionsCard data={item} />}
                            />

                        </Transactions>
                    </>
            }
        </Container>
    );
}
