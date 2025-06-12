import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Notification } from "../types/notification.type";

type NotificationsContext = {
  notifications: Notification[];
  offset: number;
  isLoading: boolean;
  notificationsCount: number;
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setNotificationsCount: Dispatch<SetStateAction<number>>;
};

export const NotificationsContext = createContext<NotificationsContext>({
  notifications: [],
  offset: 0,
  isLoading: true,
  notificationsCount: 0,
  setNotifications: () => undefined,
  setOffset: () => undefined,
  setIsLoading: () => undefined,
  setNotificationsCount: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function NotificationsProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState<number>(0);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        offset,
        isLoading,
        notificationsCount,
        setNotifications,
        setOffset,
        setIsLoading,
        setNotificationsCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
