import styles from "./Form.module.sass";

export const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={styles["login-form"]}>
      {children}
      <div className={styles["submit-wrapper"]}>
        <input className={styles["submit-button"]} type="submit" />
      </div>
    </form>
  );
};
