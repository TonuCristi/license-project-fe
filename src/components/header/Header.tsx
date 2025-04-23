import Logo from "../Logo";
import Navbar from "./Navbar";
import ProfileBadge from "./ProfileBadge";

import { useSSE } from "../notifications/hooks/useSSE";

export default function Header() {
  useSSE();

  return (
    <header className="bg-primary grid grid-cols-3 items-center px-4 py-2">
      <div className="justify-self-start">
        <Logo />
      </div>
      <div className="justify-self-center">
        <Navbar />
      </div>
      <div className="justify-self-end">
        <ProfileBadge />
      </div>
    </header>
  );
}
