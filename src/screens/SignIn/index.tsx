import React, { useContext } from "react";
import { Alert } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from "../../Hooks/auth";

import { SignInSocialButton } from '../../components/SingInSocialButton';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SingInTitle,
    Footer,
    FooterWrapper
} from './styles'

export function SignIn() {
    const { singInWithGoogle } = useAuth();

    async function handleSingInWithGoogle() {
        try {
            await singInWithGoogle();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar a conta Google')
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SingInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SingInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSingInWithGoogle}
                    />
                    <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
                </FooterWrapper>
            </Footer>

        </Container>
    );
}