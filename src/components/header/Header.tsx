import { useContext } from "react";

import Logo from "../Logo";
import Navbar from "./Navbar";
import ProfileBadge from "./ProfileBadge";

import { RoomContext } from "../../contexts/RoomContext";
import { UserContext } from "../../contexts/UserContext";

export default function Header() {
  const { room } = useContext(RoomContext);
  const { user } = useContext(UserContext);

  return (
    <header className="bg-primary grid grid-cols-3 items-center px-2 py-2 sm:px-4">
      <div className="justify-self-start">
        <Logo />
      </div>
      <div className="justify-self-center">
        {(!!room || user?.role !== "assistant") && <Navbar />}
      </div>
      <div className="justify-self-end">
        <ProfileBadge />
      </div>
    </header>
  );
}
