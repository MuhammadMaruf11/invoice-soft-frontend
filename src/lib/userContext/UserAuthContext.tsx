// UserAuthContext.tsx
import {  useState, useEffect, ReactNode } from 'react';
import { UserAuthContext } from './UserAuthContext';


export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isUserAuthenticated, setisUserAuthenticated] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setisUserAuthenticated(!!token); 
        setIsLoading(false);
    }, []);

    return (
        <UserAuthContext.Provider value={{ isUserAuthenticated, isLoading }}>
            {!isLoading && children}
        </UserAuthContext.Provider>
    );
};
