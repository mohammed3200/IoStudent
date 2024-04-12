import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null },
    onLogin?: (RegNo: string, password: string) => Promise<any>,
    onLogout?: () => Promise<any>,
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://results.justhost.ly';
const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null, authenticated: boolean | null
    }>({
        token: null,
        authenticated: null
    })
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored:", token);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token,
                    authenticated: true
                });
            }

        }
        loadToken();
    }, [])

    const login = async (regno: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth/signin`, { RegNo: regno, Password: password });

            console.log("🔒 ~ file: AuthContext.tsx:34 ~ login ~ result:", result);

            setAuthState({
                token: result.data.data.access_token,
                authenticated: true
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.data.access_token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.data.access_token);

            return result;

        } catch (err) {
            return { error: true, msg: (err as any).response?.data.statusCode };
        }
    };

    const logout = async () => {
        // Remove token from local storage and headers
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        // Update HTTP Headers
        axios.defaults.headers.common["Authorization"] = '';

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: false
        });
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}