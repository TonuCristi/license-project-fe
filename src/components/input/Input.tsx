import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import InputIcon from "./InputIcon";

import { useFormContext } from "react-hook-form";

const containerVariants = cva("flex items-center", {
  variants: {
    variant: {
      primary: "border-primary border-2 rounded-lg overflow-hidden bg-white",
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

const inputVariants = cva("outline-none", {
  variants: {
    variant: {
      primary: "py-1 px-2 placeholder:text-sm",
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
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  VariantProps<typeof inputVariants> & {
    name: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onLeftIconClick?: () => void;
    onRightIconClick?: () => void;
  };

export default function Input({
  variant,
  size,
  className,
  name,
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
  ...props
}: Props) {
  const { register } = useFormContext();

  return (
    <div className={twMerge(containerVariants({ variant, size, className }))}>
      {leftIcon && (
        <InputIcon onClick={onLeftIconClick} className="ml-2">
          {leftIcon}
        </InputIcon>
      )}
      <input
        {...props}
        {...register(name)}
        className={twMerge(inputVariants({ variant, size, className }))}
      />
      {rightIcon && (
        <InputIcon onClick={onRightIconClick} className="mr-2">
          {rightIcon}
        </InputIcon>
      )}
    </div>
  );
}
