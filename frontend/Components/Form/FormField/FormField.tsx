import { FC } from "react";
import { Input } from "../../../ui/src/Input/Input";

export const FormField: FC<any> = ({
  type,
  onChange,
  label,
  placeholder,
  error,
  ...rest
}) => {
  return (
    <Input
      type={type}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      error={error}
      {...rest}
    />
  );
};
