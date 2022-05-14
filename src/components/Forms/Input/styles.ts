import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
    width:100%;
    padding:16px 18px;

    font-family:${({ theme }) => theme.fonts.regular};
    font-size:${RFValue(14)}px;

    color:${({ theme }) => theme.colors.text_Dark};
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    margin-bottom:8px;
`;