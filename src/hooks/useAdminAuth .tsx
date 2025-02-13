// useAdminAuth.ts
import { useContext } from 'react';
import { AdminAuthContext } from '../lib/adminContext/AdminAuthContext';

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuth must be used within a AdminAuthProvider');
    }
    return context;
};
