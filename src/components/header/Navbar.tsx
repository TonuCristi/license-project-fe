import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ContactsButton from "./ContactsButton";
import NavbarItem from "./NavbarItem";
import NotificationsButton from "./NotificationsButton";
import { HiMiniUser, HiMiniUserGroup } from "react-icons/hi2";
import { Link } from "react-router";

const links = [
  { to: "employees", text: <HiMiniUser /> },
  { to: "teams", text: <HiMiniUserGroup /> },
];

export default function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <ul className="flex items-center justify-center gap-3">
        <ContactsButton />
        {user?.role === "chief" &&
          links.map(({ to, text }) => (
            <NavbarItem key={to}>
              <Link
                to={`/${to}`}
                className="text-xl text-blue-200 transition-colors ease-initial hover:text-white"
              >
                {text}
              </Link>
            </NavbarItem>
          ))}
        <NotificationsButton />
      </ul>
    </nav>
  );
}
