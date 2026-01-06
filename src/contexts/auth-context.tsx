import { createContext, type Dispatch, type SetStateAction } from "react";
export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
