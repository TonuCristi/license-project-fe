import {
  HiMiniBell,
  HiMiniChatBubbleOvalLeft,
  HiMiniUserGroup,
} from "react-icons/hi2";

const icons = [
  {
    name: "chat",
    element: <HiMiniChatBubbleOvalLeft />,
  },
  {
    name: "contacts",
    element: <HiMiniUserGroup />,
  },
  {
    name: "notifications",
    element: <HiMiniBell />,
  },
];

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-3 text-xl text-blue-200">
        {icons.map(({ name, element }) => (
          <li
            key={name}
            className="transition-300 transition-colors ease-initial hover:text-white"
          >
            <button className="cursor-pointer">{element}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
