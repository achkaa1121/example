import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContextProvider";

export const AdminLayout = () => {
  return (
    <AuthContextProvider>
      <div className="m-10">
        <Outlet />
      </div>
    </AuthContextProvider>
  );
};
