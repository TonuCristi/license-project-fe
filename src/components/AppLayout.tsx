import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import Header from "./header/Header";
import Loader from "./Loader";

import { useFetchLoggedUser } from "../hooks/useFetchLoggedUser";
import { useFetchRoom } from "./profile/hooks/useFetchRoom";
import { useFetchContacts } from "./contacts/hooks/useFetchContacts";
import { useFetchNotifications } from "./notifications/hooks/useFetchNotifications";
import { useSSE } from "./notifications/hooks/useSSE";

export default function AppLayout() {
  const { isLoading: isLoggedUserLoading } = useFetchLoggedUser();
  const { isLoading: isRoomLoading } = useFetchRoom();
  const { getContacts, isContactsLoading } = useFetchContacts();
  const { isLoading: isNotificationsLoading } = useFetchNotifications();
  useSSE();
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  useEffect(() => {
    if (pathnames) {
      navigate("/");
    }
  }, [navigate, pathnames]);

  if (
    pathnames ||
    isLoggedUserLoading ||
    isRoomLoading ||
    isContactsLoading ||
    isNotificationsLoading
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
