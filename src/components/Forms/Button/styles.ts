import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native'


export const Container = styled(TouchableOpacity)`
width:100%;
background-color: ${({ theme }) => theme.colors.secundary};


padding:18px;
border-radius:5px;
align-items:center;

`;

export const Title = styled.Text`
font-size:${RFValue(14)}px;
font-family:${({ theme }) => theme.fonts.medium};

color: ${({ theme }) => theme.colors.shape};

`;