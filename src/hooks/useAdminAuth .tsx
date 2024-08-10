// useAdminAuth.ts
import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if an admin token exists in localStorage
        const token = localStorage.getItem('adminToken');
        setIsAuthenticated(!!token); // Convert token to boolean
    }, []);

    return { isAuthenticated };
};
