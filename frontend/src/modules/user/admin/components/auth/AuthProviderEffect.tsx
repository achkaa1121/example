import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./useAuthContext";

export const AuthProvderEffect = () => {
  const user = useUser();

  console.log(user);

  if (user?.id) {
    return <Outlet />;
  }

  return <Navigate to={"admin/login"} />;
};
