import styles from "./index.module.sass";

export const FormWrapper = ({ title, children }) => {
  return (
    <div className={styles["form-wrapper"]}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
