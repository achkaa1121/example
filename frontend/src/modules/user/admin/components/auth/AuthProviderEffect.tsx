import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuthContext";

export const AuthProviderEffect = () => {
  const { user } = useAuth();

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={"/admin/login"} replace />;
};
