import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const labelVariants = cva("", {
  variants: {
    variant: {
      primary: "text-sm font-semibold",
    },
    size: {
      primary: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "primary",
  },
});

type Props = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> &
  VariantProps<typeof labelVariants> & { children: ReactNode };

export default function Label({
  variant,
  size,
  className,
  children,
  ...props
}: Props) {
  return (
    <label
      {...props}
      className={twMerge(labelVariants({ variant, size, className }))}
    >
      {children}
    </label>
  );
}
