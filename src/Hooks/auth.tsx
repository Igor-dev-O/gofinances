import React, { createContext, useContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
//import * as AppleAuthentication from 'expo-apple-authentication'
//import Storage from '@react-native-async-storage/async-storage'

interface IAuthProviderProps {
    children: React.ReactNode
}


interface IAuthProviderProps {
    children: React.ReactNode

}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}
interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse {
    params: {
        access_token: string
    };
    type: string;
}
export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {

    const [user, setUser] = useState<User>({} as User);
    async function signInWithGoogle(): Promise<void> {
        try {

            const CLIENT_ID = '512101518255-co4ocj6c21e2f9fc2brf6vdrc4hr3dde.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@noaaaaa/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`;

            const response = await AuthSession.startAsync({ authUrl });
            console.log(response);

        } catch (error) {
            throw new Error(error as string);
        }

    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context;
}


export { AuthProvider, useAuth } 