import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { useFormContext } from "react-hook-form";

const textareaVariants = cva("outline-none", {
  variants: {
    variant: {
      primary:
        "py-1 px-2 placeholder:text-sm disabled:bg-secondary-disabled border-primary border-2 rounded-lg bg-white",
    },
    size: {
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "full",
  },
});

type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  VariantProps<typeof textareaVariants> & {
    name: string;
  };

export default function Textarea({
  variant,
  size,
  className,
  name,
  ...props
}: Props) {
  const { register } = useFormContext();

  return (
    <textarea
      {...props}
      {...register(name)}
      className={twMerge(textareaVariants({ variant, size, className }))}
    />
  );
}
