import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import Loader from "./Loader";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames =
    location.pathname === "/profile" || location.pathname === "/";

  useEffect(() => {
    if (pathnames) {
      navigate("/login");
    }
  }, [navigate, pathnames]);

  if (pathnames) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <Outlet />;
}
