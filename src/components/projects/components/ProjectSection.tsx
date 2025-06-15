import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLElement>;

export default function ProjectSection({ className, children }: Props) {
  return (
    <section
      className={twMerge(
        className,
        "border-primary flex flex-col gap-1 border-t-2 pt-2",
      )}
    >
      {children}
    </section>
  );
}
