import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins';


import theme from './src/global/styles/theme';


import { Routes } from './src/routes/index';

import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/Hooks/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return (
      <AppLoading />

    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>

        <StatusBar barStyle="light-content" />

        <AuthProvider>
          <SignIn />
        </AuthProvider>


      </ThemeProvider>
    </GestureHandlerRootView>
  );

}

