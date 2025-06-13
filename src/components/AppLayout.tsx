import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import Header from "./header/Header";
import Loader from "./Loader";

import { useFetchLoggedUser } from "../hooks/useFetchLoggedUser";
import { useFetchRoom } from "./profile/hooks/useFetchRoom";
import { useSSE } from "./notifications/hooks/useSSE";
import { useFetchNotificationsCount } from "./notifications/hooks/useFetchNotificationsCount";

export default function AppLayout() {
  const { isLoading: isLoggedUserLoading } = useFetchLoggedUser();
  const { isLoading: isRoomLoading } = useFetchRoom();
  const { isLoading: isNotificationsCountLoading } =
    useFetchNotificationsCount();
  useSSE();
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

  if (
    pathnames ||
    isLoggedUserLoading ||
    isRoomLoading ||
    isNotificationsCountLoading
  ) {
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
