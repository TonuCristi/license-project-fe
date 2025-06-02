import { useContext } from "react";

import Logo from "../Logo";
import ProfileBadge from "./ProfileBadge";
import NavMenu from "./NavMenu";
import NotificationsButton from "./NotificationsButton";
import ContactsButton from "./ContactsButton";

import { RoomContext } from "../../contexts/RoomContext";
import { UserContext } from "../../contexts/UserContext";

export default function Header() {
  const { room } = useContext(RoomContext);
  const { user } = useContext(UserContext);

  return (
    <header className="bg-primary grid grid-cols-2 items-center px-2 py-2 sm:px-4">
      <div className="flex items-center gap-4 justify-self-start">
        <Logo />
        {(!!room || user?.role !== "assistant") && <NavMenu />}
      </div>

      <div className="flex items-center gap-4 justify-self-end">
        <NotificationsButton />
        <ContactsButton />
        <ProfileBadge />
      </div>
    </header>
  );
}
