import Logo from "../Logo";
import Navbar from "./Navbar";
import ProfileBadge from "./ProfileBadge";

export default function Header() {
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
