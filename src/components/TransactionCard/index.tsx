import React from 'react';
import { categories } from '../../utils/categories';
import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CAtegoryName,
    Date


} from './styles';



export interface TransactionsCardProps {
    type: 'positive' | 'negative',
    name: string,
    amount: string,
    category: string,
    date: string,
}

interface Props {
    data: TransactionsCardProps
}

export function TransactionsCard({ data }: Props) {
    const category = categories.filter(
        item => item.key === data.category
    )[0];
    return (
        // && = acrecenta
        <Container>
            <Title>
                {data.name}
            </Title>

            <Amount type={data.type}>

                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CAtegoryName>
                        {category.name}
                    </CAtegoryName>
                </Category>

                <Date>
                    {data.date}
                </Date>

            </Footer>


        </Container>
    );

}