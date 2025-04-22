import Button from "../../Button";
import { HiMiniXMark } from "react-icons/hi2";

export default function Notification() {
  return (
    <li className="border-primary rounded-lg border-2 p-2">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 font-medium">
          <h3>Notification</h3>
          <span>-</span>
          <span>07:00</span>
        </div>
        <Button variant="empty">
          <HiMiniXMark className="text-primary stroke-1 text-xl" />
        </Button>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, eius?
      </p>
    </li>
  );
}
