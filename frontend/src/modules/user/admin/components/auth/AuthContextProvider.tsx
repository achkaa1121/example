import { AuthContext } from "./useAuthContext";
import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string } | null>(null);

  const login = () => {
    localStorage.setItem("userToken", "1");
    navigate("/admin/create-movie");
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
