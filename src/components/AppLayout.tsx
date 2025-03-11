import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

import Header from "./header/Header";
import Loader from "./Loader";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  useEffect(() => {
    if (pathnames) {
      navigate("/");
    }
  }, [navigate, pathnames]);

  if (pathnames) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
