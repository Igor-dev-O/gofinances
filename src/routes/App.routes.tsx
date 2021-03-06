import React from "react";
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resumo } from '../screens/Resume';



export function AppRoutes() {
    const theme = useTheme();
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secundary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 80,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }

            }}

        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ color, size }) =>
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ color, size }) =>
                        <MaterialIcons
                            name="attach-money"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Resumo"
                component={Resumo}
                options={{
                    tabBarIcon: (({ color, size }) =>
                        <MaterialIcons
                            name="pie-chart"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

        </Navigator>
    );
}