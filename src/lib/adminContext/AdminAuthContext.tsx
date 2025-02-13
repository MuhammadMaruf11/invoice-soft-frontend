import { useState, useEffect, ReactNode } from "react";
import { AdminAuthContext } from "./AdminAuthContext";

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        setIsAdminAuthenticated(!!token);
        setIsLoading(false);
    }, []);

    return (
        <AdminAuthContext.Provider value={{ isAdminAuthenticated, isLoading }}>
            {!isLoading && children}
        </AdminAuthContext.Provider>
    );
};
