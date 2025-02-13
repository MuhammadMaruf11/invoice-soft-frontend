import { createContext } from "react";

export type UserAuthContextType = {
  isAdminAuthenticated: boolean;
  isLoading: boolean;
};

export const AdminAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);
