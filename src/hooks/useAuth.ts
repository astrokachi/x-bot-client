import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../contexts/auth-context";

export const useAuth = () => {
  const context = useContext<AuthContextType | null>(AuthContext);

  if (!context) {
    throw new Error("Authcontext must be used within the AuthProvider.");
  }

  return context;
};
