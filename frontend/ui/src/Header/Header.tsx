import NavLink from "../NavLink/NavLink";

import styles from "./Header.module.sass";
import { useAuth } from "../../../Components/AuthContext/AuthContext";

export const Header = () => {
  const { logout, currentUser } = useAuth();

  return (
    <header className={styles.navbar}>
      <NavLink href="/" text="Главная" />
      <NavLink href="/deeds" text="Список добрых дел" />
      <NavLink href={`/profile`} text="Профиль" />
      <NavLink href="/friends" text="Друзья" />
      {currentUser ? (
        <button className={styles["logout"]} onClick={logout}>
          Выйти
        </button>
      ) : (
        <NavLink href="/login" text="Войти" />
      )}
    </header>
  );
};
