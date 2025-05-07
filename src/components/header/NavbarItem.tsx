import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function NavbarItem({ children }: Props) {
  return <li className="flex items-center justify-center">{children}</li>;
}
