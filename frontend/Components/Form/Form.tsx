import { ChangeEventHandler, FC, ReactNode } from "react";
import styles from "./Form.module.sass";

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export const Form: FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={styles["login-form"]}>
      {children}
      <div className={styles["submit-wrapper"]}>
        <input className={styles["submit-button"]} type="submit" />
      </div>
    </form>
  );
};
