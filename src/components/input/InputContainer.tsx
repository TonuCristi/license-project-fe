import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function InputContainer({ children }: Props) {
  return <div className="flex w-full flex-col gap-1">{children}</div>;
}
