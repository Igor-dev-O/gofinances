import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

//interface para aproveiar o tipo do cartao e estiliza-lo de acordo
//
interface TypeProps {
        type: 'up' | 'dow' | 'total',
}
export const Container = styled.View <TypeProps> `
${({ type }) => type === 'up' && css`background-color: ${({ theme }) => theme.colors.shape};`};
${({ type }) => type === 'dow' && css`background-color: ${({ theme }) => theme.colors.shape};`};
       ${({ type }) => type === 'total' && css`background-color: ${({ theme }) => theme.colors.secundary};`};
        
        width:${RFValue(300)}px;
        border-radius:5px;      
        padding: 19px 23px;
        padding-bottom:${RFValue(42)}px;   
        align-items:center;
        margin-right:16px;
`;
//19 bottom e top 23 left-right
//header Card
export const Header = styled.View`           
        width:100%;
        justify-content:space-between;
        flex-direction:row;
`;
export const Title = styled.Text <TypeProps>`
        ${({ type }) => type === 'up' && css`color:${({ theme }) => theme.colors.title}`};
        ${({ type }) => type === 'dow' && css`color:${({ theme }) => theme.colors.title}`};
        ${({ type }) => type === 'total' && css`color:${({ theme }) => theme.colors.shape}`};
        font-size:${RFValue(14)}px;
        font-family:${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather) <TypeProps> `
        ${({ type }) => type === 'up' && css`color:${({ theme }) => theme.colors.success}`};
        ${({ type }) => type === 'dow' && css`color:${({ theme }) => theme.colors.attention}`};
        ${({ type }) => type === 'total' && css`color:${({ theme }) => theme.colors.shape}`};
        font-size:${RFValue(40)}px;
`;

//Footer card
export const Footer = styled.View``;

export const Amount = styled.Text <TypeProps>`
        ${({ type }) => type === 'up' && css`color:${({ theme }) => theme.colors.text_Dark}`};
        ${({ type }) => type === 'dow' && css`color:${({ theme }) => theme.colors.text_Dark}`};
        ${({ type }) => type === 'total' && css`color:${({ theme }) => theme.colors.shape}`};
        
        font-size:${RFValue(32)}px;
        font-family:${({ theme }) => theme.fonts.medium};
`;
export const LastTrasaction = styled.Text <TypeProps>`
        ${({ type }) => type === 'up' && css`color:${({ theme }) => theme.colors.text}`};
        ${({ type }) => type === 'dow' && css`color:${({ theme }) => theme.colors.text}`};
        ${({ type }) => type === 'total' && css`color:${({ theme }) => theme.colors.shape}`};
        font-size:${RFValue(12)}px;
        font-family:${({ theme }) => theme.fonts.regular};`;