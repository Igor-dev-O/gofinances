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
    const { signInWithGoogle } = useAuth();


    async function handleSingInWithGoogle() {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar a conta Google')
        }
    }
    async function handleSingInWithApple() {
        // try {
        //     await signInWithApple();
        // } catch (error) {
        //     console.log(error)
        //     Alert.alert('Não foi possível conectar a conta Apple')
        // }
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
                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSingInWithApple}
                    />
                </FooterWrapper>
            </Footer>

        </Container>
    );
}