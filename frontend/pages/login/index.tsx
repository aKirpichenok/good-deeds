import { useState } from "react";

import styles from "./index.module.sass";
import { Input } from "../../ui/src/Input/Input";
import Link from "next/link";
import { useAuth } from "../../Components/AuthContext/AuthContext";

import Cookie from "js-cookie";

const Login = () => {
  const [loginValue, setLogin] = useState("");
  const [passwordValue, setPassword] = useState("");
  const { loginUser, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(loginValue, passwordValue);
  };
  return (
    <div className={styles["form-wrapper"]}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <Input
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          placeholder={"nickname"}
          error={error}
          label="Логин"
        />
        <Input
          type="password"
          placeholder="пароль"
          onChange={(e) => setPassword(e.target.value)}
          eye={true}
          label="Пароль"
        />
        <div className={styles["submit-wrapper"]}>
          <input className={styles["submit-button"]} type="submit" />
        </div>
      </form>
      <div className={styles["tip-log"]}>
        <span>Нет аккаунта?</span>
        <Link href="/register">зарегистрироваться</Link>
      </div>
    </div>
  );
};

export default Login;
