/* eslint-disable react-refresh/only-export-components */
// UserAuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';

type UserAuthContextType = {
    isUserAuthenticated: boolean;
};

export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isUserAuthenticated, setisUserAuthenticated] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setisUserAuthenticated(!!token); // Convert token to boolean
    }, []);

    return (
        <UserAuthContext.Provider value={{ isUserAuthenticated }}>
            {children}
        </UserAuthContext.Provider>
    );
};
