import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const inputIconVariants = cva("", {
  variants: {
    variant: {
      primary: "text-primary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type Props = VariantProps<typeof inputIconVariants> & {
  children: ReactNode;
  className: string;
  onClick?: () => void;
};

export default function InputIcon({
  variant,
  className,
  children,
  onClick,
}: Props) {
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={twMerge(
        "select-none",
        inputIconVariants({ variant, className }),
        onClick && "cursor-pointer",
      )}
    >
      {children}
    </span>
  );
}
