import { useState } from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "../../store/api/AuthController";
import {
  addFriend,
  addId,
  addNickname,
  addToken,
} from "../../store/reducers/userReducer";
import { useAppDispatch } from "../../store/hook";

import styles from "./index.module.sass";
import { Input } from "../../ui/src/Input/Input";
import Link from "next/link";

const Login = () => {
  const [loginTrigger, _] = useLoginMutation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const route = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginTrigger(
        JSON.stringify({ nickname: login, password: password }),
      ).unwrap();
      console.log("RESULT", result);
      if (result) {
        dispatch(addId(result.id));
        dispatch(addNickname(login));
        localStorage.setItem("token", result.token);
        dispatch(addFriend(result.friends));
        route.push("/");
      }
    } catch (e) {
      setError(e?.data?.message);
    }
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
