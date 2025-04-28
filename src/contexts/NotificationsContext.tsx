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
  isLoading: boolean;
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const NotificationsContext = createContext<NotificationsContext>({
  notifications: [],
  isLoading: true,
  setNotifications: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function NotificationsProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <NotificationsContext.Provider
      value={{ notifications, isLoading, setNotifications, setIsLoading }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
