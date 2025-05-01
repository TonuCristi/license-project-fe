import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthPageContainer({ children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center p-2">
      {children}
    </div>
  );
}
