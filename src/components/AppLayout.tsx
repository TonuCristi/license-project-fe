import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import Header from "./header/Header";
import Loader from "./Loader";

import { useFetchLoggedUser } from "../hooks/useFetchLoggedUser";
import { useFetchRoom } from "./profile/hooks/useFetchRoom";
import { useSSE } from "./notifications/hooks/useSSE";
import { useFetchNotificationsCount } from "./notifications/hooks/useFetchNotificationsCount";

export default function AppLayout() {
  const { user, isLoading: isLoggedUserLoading } = useFetchLoggedUser();
  const { isLoading: isRoomLoading } = useFetchRoom();
  const { isLoading: isNotificationsCountLoading } =
    useFetchNotificationsCount();
  useSSE();
  const location = useLocation();
  const navigate = useNavigate();

  const authPathnames =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  const assistantRestrictedPathnames =
    location.pathname.includes("employees") ||
    location.pathname.includes("teams") ||
    location.pathname.includes("projects") ||
    location.pathname.includes("meetings");

  useEffect(() => {
    if (
      authPathnames ||
      (user?.role === "assistant" && assistantRestrictedPathnames)
    ) {
      navigate("/");
    }
  }, [navigate, authPathnames, user?.role, assistantRestrictedPathnames]);

  if (
    authPathnames ||
    (user?.role === "assistant" && assistantRestrictedPathnames) ||
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
