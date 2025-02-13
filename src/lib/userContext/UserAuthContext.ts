import { createContext } from "react";

export type UserAuthContextType = {
  isUserAuthenticated: boolean;
  isLoading: boolean;
};

export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);