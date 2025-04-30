import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import Button from "../Button";
import ContactsButton from "./ContactsButton";
import NotificationsButton from "./NotificationsButton";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-3">
        <li className="transition-colors ease-initial hover:text-white">
          <Button variant="empty" className="text-xl text-blue-200">
            <HiMiniChatBubbleOvalLeft />
          </Button>
        </li>
        <ContactsButton />
        <NotificationsButton />
      </ul>
    </nav>
  );
}
