import { HTMLProps, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const messageVariants = cva("font-medium text-sm", {
  variants: {
    variant: {
      success: "text-primary",
      error: "text-red-500",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

type Props = HTMLProps<HTMLParagraphElement> &
  VariantProps<typeof messageVariants> & {
    children: ReactNode;
  };

export default function Message({ variant, className, children }: Props) {
  return (
    <p className={twMerge(messageVariants({ variant, className }))}>
      {children}
    </p>
  );
}
