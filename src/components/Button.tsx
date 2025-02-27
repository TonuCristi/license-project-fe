import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva("disabled:cursor-no-drop cursor-pointer", {
  variants: {
    variant: {
      primary:
        "bg-primary rounded-lg text-white hover:bg-primary-hover transition-colors disabled:bg-primary-disabled px-2 py-1.5",
      secondary:
        "bg-white rounded-lg text-primary font-medium transition-colors hover:bg-secondary-hover disabled:bg-secondary-disabled px-2 py-1.5",
      reject:
        "bg-red-500 rounded-lg text-white hover:bg-red-400 transition-colors disabled:bg-red-500 px-2 py-1.5",
      empty: "",
    },
    size: {
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof buttonVariants> & { children: ReactNode };

export default function Button({
  variant,
  size,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={twMerge(buttonVariants({ variant, size, className }))}
    >
      {children}
    </button>
  );
}
