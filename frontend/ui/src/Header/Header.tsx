import { useRouter } from "next/router";
import NavLink from "../NavLink/NavLink";

import styles from "./Header.module.sass";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { addId, addNickname } from "../../../store/reducers/userReducer";
import { useAuth } from "../../../Components/AuthContext/AuthContext";
import Cookie from "js-cookie";

export const Header = () => {
  const route = useRouter();
  const token = Cookie.get("token");
  const dispatch = useAppDispatch();
  const { logout } = useAuth();

  return (
    <header className={styles.navbar}>
      <NavLink href="/" text="Главная" />
      <NavLink href="/deeds" text="Список добрых дел" />
      <NavLink href={`/profile`} text="Профиль" />
      <NavLink href="/friends" text="Друзья" />
      {!!token ? (
        <button className={styles["logout"]} onClick={logout}>
          Выйти
        </button>
      ) : (
        <NavLink href="/login" text="Войти" />
      )}
    </header>
  );
};
