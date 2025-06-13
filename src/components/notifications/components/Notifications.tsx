import { useContext, useEffect, useRef } from "react";

import NotificationItem from "./NotificationItem";

import { NotificationsContext } from "../../../contexts/NotificationsContext";
import { useFetchNotifications } from "../hooks/useFetchNotifications";

const PER_PAGE = 10;

export default function Notifications() {
  const { notifications, offset, isLoading, setOffset, setIsLoading } =
    useContext(NotificationsContext);
  const { getNotifications } = useFetchNotifications();

  const listRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const controllerRef = useRef<AbortController>();

  useEffect(() => {
    const options = {
      root: listRef.current,
      rootMargin: "0px",
      threshold: 0.1,
    };

    setIsLoading(false);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        controllerRef.current = new AbortController();
        getNotifications(offset, PER_PAGE, controllerRef.current);
        setOffset((prev) => prev + 1);
      }
    }, options);

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [notifications.length]);

  return (
    <div className="border-primary flex h-full w-full flex-col gap-2 rounded-lg border-2 bg-blue-50 p-3">
      <h2 className="text-lg font-medium">Notifications</h2>
      <ul
        ref={listRef}
        className="scrollbar flex h-full flex-col gap-2 overflow-y-auto pr-2"
      >
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        <li ref={itemRef} className="p-0.5"></li>
      </ul>
    </div>
  );
}
