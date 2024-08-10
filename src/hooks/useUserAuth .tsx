// useUserAuth.ts
import { useState, useEffect } from 'react';

export const useUserAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if a user token exists in localStorage
        const token = localStorage.getItem('userToken');
        setIsAuthenticated(!!token); // Convert token to boolean
    }, []);

    return { isAuthenticated };
};
