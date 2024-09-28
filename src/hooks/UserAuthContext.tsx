// UserAuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';

type UserAuthContextType = {
    isAuthenticated: boolean;
};

export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setIsAuthenticated(!!token); // Convert token to boolean
    }, []);

    return (
        <UserAuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </UserAuthContext.Provider>
    );
};
