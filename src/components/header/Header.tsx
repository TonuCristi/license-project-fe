import Logo from "../Logo";
import Navbar from "./Navbar";
import ProfileBadge from "./ProfileBadge";

export default function Header() {
  return (
    <header className="grid grid-cols-3 items-center bg-blue-500 px-4 py-2">
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
