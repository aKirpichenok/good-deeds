import { useRouter } from "next/router";
import NavLink from "../NavLink/NavLink";

import styles from "./Header.module.sass";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { addId, addNickname } from "../../../store/reducers/userReducer";

export const Header = () => {
  const route = useRouter();
  const { id } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(addId(""));
    dispatch(addNickname(""));
    route.push("/");
  };
  return (
    <header className={styles.navbar}>
      <NavLink href="/" text="Главная" />
      <NavLink href="/deeds" text="Список добрых дел" />
      <NavLink href={`/profile`} text="Профиль" />
      <NavLink href="/friends" text="Друзья" />
      {!!id ? (
        <button className={styles["logout"]} onClick={logout}>
          Выйти
        </button>
      ) : (
        <NavLink href="/login" text="Войти" />
      )}
    </header>
  );
};
