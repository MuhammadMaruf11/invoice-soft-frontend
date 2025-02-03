/* eslint-disable react-refresh/only-export-components */
// UserAuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';

type UserAuthContextType = {
    isAdminAuthenticated: boolean;
};

export const AdminAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        setIsAdminAuthenticated(!!token); // Convert token to boolean
    }, []);

    return (
        <AdminAuthContext.Provider value={{ isAdminAuthenticated }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
