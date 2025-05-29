import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

export default function Overlay({ children }: Props) {
  return createPortal(
    <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-blue-300/25 backdrop-blur-md">
      {children}
    </div>,
    document.body,
  );
}
