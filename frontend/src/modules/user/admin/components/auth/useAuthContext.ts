import { createContext, useContext } from "react";

interface IUser {
  id: string;
}

export const AuthContext = createContext<IUser | null>(null);

export const useUser = () => {
  const user = useContext(AuthContext);

  return user;
};
