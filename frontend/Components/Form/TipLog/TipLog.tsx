import Link from "next/link";
import styles from "./TipLog.module.sass";

export const TipLog = () => {
  return (
    <div className={styles["tip-log"]}>
      <span>Нет аккаунта?</span>
      <Link href="/register">зарегистрироваться</Link>
    </div>
  );
};
