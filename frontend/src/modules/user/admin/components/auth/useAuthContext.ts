import { createContext, useContext } from "react";

interface IAuthContextValue {
  user: {
    id: string;
  } | null;

  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextValue | null>(null);

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw Error("Must be in provider");
  }

  return authContextValue;
};
