import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./App.routes";
import { useAuth } from "../Hooks/auth"

export function Routes() {
    const { user } = useAuth();
    console.log(user)
    return (
        <NavigationContainer>
            {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>

    )
}