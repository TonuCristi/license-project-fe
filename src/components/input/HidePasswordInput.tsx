import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

import Input from "./Input";
import Label from "../Label";
import Message from "../Message";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  htmlFor?: string;
  name: string;
  error?: string;
};

export default function HidePasswordInput({
  htmlFor,
  label,
  error,
  ...props
}: Omit<Props, "variant" | "size">) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        {...props}
        type={isHidden ? "password" : "text"}
        rightIcon={isHidden ? <HiMiniEye /> : <HiMiniEyeSlash />}
        onRightIconClick={() => setIsHidden((prev) => !prev)}
      />
      {error && <Message variant="error">{error}</Message>}
    </div>
  );
}
