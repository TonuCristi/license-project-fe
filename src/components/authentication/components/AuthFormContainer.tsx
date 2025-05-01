import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthFormContainer({ children }: Props) {
  return (
    <div className="border-primary xxs:w-4/5 xs:w-80 w-full rounded-lg border-2 p-4">
      {children}
    </div>
  );
}
