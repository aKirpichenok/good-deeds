import { FC, ReactNode } from "react";
import styles from "./index.module.sass";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export const FormWrapper: FC<FormWrapperProps> = ({ title, children }) => {
  return (
    <div className={styles["form-wrapper"]}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
