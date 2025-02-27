import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const selectVariants = cva("outline-none", {
  variants: {
    variant: {
      primary:
        "rounded-lg border-2 border-primary px-2 py-1 placeholder:text-sm disabled:bg-secondary-disabled",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type Option = {
  value: string;
  text: string;
};

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  VariantProps<typeof selectVariants> & {
    name: string;
    placeholder?: string;
    options: Option[];
  };

export default function Select({
  variant,
  className,
  options,
  name,
  placeholder,
  ...props
}: Props) {
  const { register } = useFormContext();

  return (
    <select
      {...register(name)}
      {...props}
      className={twMerge(selectVariants({ variant, className }))}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map(({ value, text }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
}
