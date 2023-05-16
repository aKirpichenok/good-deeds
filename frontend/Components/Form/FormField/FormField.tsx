import { ChangeEventHandler, FC } from "react";
import { Input } from "../../../ui/src/Input/Input";

type FormFieldProps = {
  type: string;
  onChange: ChangeEventHandler;
  label: string;
  placeholder?: string;
  error: string;
};

export const FormField: FC<FormFieldProps> = ({
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
