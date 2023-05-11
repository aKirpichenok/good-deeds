import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useRegistrationMutation } from "../../store/api/AuthController";
import { Input } from "../../ui/src/Input/Input";

import styles from "./index.module.sass";
import { useAppDispatch } from "../../store/hook";
import { addId, addNickname } from "../../store/reducers/userReducer";

const Register = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [female, setFemale] = useState("");
  const [error, setError] = useState("");
  const [registrationTrigger, _] = useRegistrationMutation();
  const route = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await registrationTrigger(
        JSON.stringify({ nickname, password, name, female }),
      ).unwrap();
      if (result) {
        dispatch(addId(result.id));
        dispatch(addNickname(result.nickname));
        route.push("/");
      }
    } catch (e) {
      setError(e?.data?.message);
    }
  };
  return (
    <div className={styles["form-wrapper"]}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <Input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          placeholder={"aKirpichenok"}
          error={error}
          label={"Логин"}
        />
        <Input
          type="password"
          placeholder="qwe123"
          onChange={(e) => setPassword(e.target.value)}
          eye={true}
          label={"Пароль"}
        />
        <Input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder={"Андрей"}
          error={error}
          label={"Имя"}
        />
        <Input
          type="text"
          onChange={(e) => setFemale(e.target.value)}
          placeholder={"Кирпиченок"}
          error={error}
          label={"Фамилия"}
        />
        <div className={styles["submit-wrapper"]}>
          <input className={styles["submit-button"]} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
