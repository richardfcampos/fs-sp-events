import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {AuthContextType, UserData} from "@/interfaces/auth/AuthInterface";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const storedAuthState = localStorage.getItem('isAuthenticated');

        const userStorage: UserData|null = localStorage.getItem('userData')
            ? JSON.parse(localStorage.getItem('userData') ?? '')
            : null
        if (storedAuthState === 'true') {
            setIsAuthenticated(true);
            setUserData(userStorage)
        }

    }, []);

    const login = (userData:UserData) => {
        setIsAuthenticated(true);
        setUserData(userData);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
