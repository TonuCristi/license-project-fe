import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import Header from "./header/Header";
import Loader from "./Loader";

import { useFetchLoggedUser } from "../hooks/useFetchLoggedUser";

export default function AppLayout() {
  const { isLoading } = useFetchLoggedUser();
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

  if (pathnames || isLoading) {
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
