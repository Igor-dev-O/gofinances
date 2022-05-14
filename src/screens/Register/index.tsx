import React, { useState, useEffect } from "react";
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

import { useForm } from "react-hook-form";
import {
    useNavigation,
    NavigationProp,
    ParamListBase,
} from "@react-navigation/native";

import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
    Container,
    Header,
    Title,
    Form,
    Filds,
    TransactionTypes

} from './styles'

interface FormData {
    name: string;
    amount: number;
}

const schema = yup.object({
    name: yup
        .string()
        .required('Nome é obrigatório'),
    amount: yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negattivo')
        .required('Valor é obrigatório'),
}).required();

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModaOpen] = useState(false);

    const dataKey = '@gofinance:transactions';

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category',
    });

    const { navigate }: NavigationProp<ParamListBase> = useNavigation();


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypesSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModaOpen(true)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModaOpen(false)
    }


    async function handleRegister(form: Partial<FormData>) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo da transação');

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria da transação');


        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date(),
        };

        try {


            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ];


            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            //RESET FOMULARIO
            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Category',
            });
            navigate('Listagem');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivel salvar")
        }
    }

    // useEffect(() => {
    //     // async function loadData() {
    //     //     const data = await AsyncStorage.getItem(dataKey);
    //     //     console.log(JSON.parse(data!));
    //     // }
    //     // loadData();
    //     // DELETE CADASTRO
    //     async function removeAll() {
    //         await AsyncStorage.removeItem(dataKey);

    //     }
    //     removeAll()

    // }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>

                <Header>
                    <Title>
                        Cadastro
                    </Title>
                </Header>
                <Form>
                    <Filds>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Name"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}

                        />
                        <TransactionTypes>
                            <TransactionTypeButton
                                type='up'
                                title='Income'
                                onPress={() => handleTransactionTypesSelect('positive')}
                                isActive={transactionType === 'positive'}

                            />
                            <TransactionTypeButton
                                type='down'
                                title='Outcome'
                                onPress={() => handleTransactionTypesSelect('negative')}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionTypes>

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Filds>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen} >
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSlectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}