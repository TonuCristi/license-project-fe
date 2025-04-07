import { HiMiniBell, HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import Button from "../Button";
import ContactsButton from "./ContactsButton";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-3 text-xl text-blue-200">
        <li className="transition-colors ease-initial hover:text-white">
          <Button variant="empty">
            <HiMiniChatBubbleOvalLeft />
          </Button>
        </li>
        <ContactsButton />
        <li className="transition-colors ease-initial hover:text-white">
          <Button variant="empty">
            <HiMiniBell />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
