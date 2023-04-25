import Link from "next/link";
import styles from "./index.module.sass";
const Index = () => {
  return (
    <div className={styles["page__main"]}>
      <h1 className={styles["main-title"]}>
        Приложение для создания списка добрых дел!
      </h1>
      <p className={styles["main-subtitle"]}>
        Тут можно создавать добрые дела, удалять, редактировать
      </p>
      <p className={styles["main-subtitle"]}>
        Так же тут есть друзья, которых можно добавлять, смотреть их добрые дела
        и удалять их из своего списка
      </p>
      <div className={styles["main-trigger"]}>
        <span className={styles["trigger-text"]}>
          К созданию <span className={styles["highlight"]}>своего</span> списка
        </span>
        <Link href={"/deeds"}>Перейти</Link>
      </div>
    </div>
  );
};

export default Index;
