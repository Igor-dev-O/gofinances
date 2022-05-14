import React from "react";
import {
    Container,
    Categoria,
    Icon,
} from './styles';

interface Props {
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: Props) {
    return (
        <Container onPress={onPress}>
            <Categoria>{title}</Categoria>
            <Icon name="chevron-down" />
        </Container>
    );
}