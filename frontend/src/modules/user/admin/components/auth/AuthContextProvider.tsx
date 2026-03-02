import { Outlet } from "react-router-dom";
import { AuthContext } from "./useAuthContext";

export const AuthContextProvider = () => {
  return (
    <AuthContext.Provider value={null}>
      <Outlet />
    </AuthContext.Provider>
  );
};
