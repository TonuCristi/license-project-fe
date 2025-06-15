import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProjectSectionTitle({ children }: Props) {
  return <p className="text-center font-bold uppercase">{children}</p>;
}
