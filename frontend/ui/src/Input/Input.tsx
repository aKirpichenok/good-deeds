import { ChangeEventHandler, FC, useState } from "react";
import styles from "./Input.module.sass";

interface InputProps {
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  placeholder: string;
  error?: string;
  eye?: boolean;
  label: string;
  value?: string;
  rest?: any;
}

export const Input: FC<InputProps> = ({
  type,
  onChange,
  placeholder,
  error,
  eye,
  label,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <label className={styles[`${type}-label`]}>
      <span>{label}</span>
      <input
        className={styles[`${type}__input`]}
        type={showPassword ? type : "text"}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      {eye &&
        (showPassword ? (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles["eye-password"]}
          >
            👁️‍🗨️
          </span>
        ) : (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles["eye-password"]}
          >
            👀
          </span>
        ))}
      {!!error && <span className={styles["error-message"]}>{error}</span>}
    </label>
  );
};
