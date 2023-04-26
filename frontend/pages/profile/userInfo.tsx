import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Input } from "../../ui/src/Input/Input";

import styles from "./index.module.sass";
import {
  changeFemale,
  changeName,
  changeNickname,
} from "../../store/reducers/userReducer";

export const UserInfo = ({ isEdit, editProfile, submitEdit }) => {
  const { name, female, nickname, friends } = useAppSelector(
    (state) => state.userReducer,
  );
  const [newName, setName] = useState(name);
  const [newFemale, setFemale] = useState(female);
  const [newNickname, setNickname] = useState(nickname);

  const dispatch = useAppDispatch();

  const arr = [
    {
      headerValue: "Имя",
      value: newName,
      callback: (e) => setName(e.target.value),
      oldValue: name,
    },
    {
      headerValue: "Фамилия",
      value: newFemale,
      callback: (e) => setFemale(e.target.value),
      oldValue: female,
    },
    {
      headerValue: "Никнейм",
      value: newNickname,
      callback: (e) => setNickname(e.target.value),
      oldValue: nickname,
    },
  ];

  const handleSave = () => {
    submitEdit({ newName, newFemale, newNickname });
    dispatch(changeName(newName));
    dispatch(changeFemale(newFemale));
    dispatch(changeNickname(newNickname));
  };

  return (
    <>
      {arr.map((field) =>
        isEdit ? (
          <Input
            label={field.headerValue}
            onChange={field.callback}
            placeholder={field.headerValue}
            type="text"
            value={field.value}
          />
        ) : (
          <>
            <h2>{field.headerValue}</h2>
            <span>{field.oldValue}</span>
          </>
        ),
      )}
      <h2 className={styles["profile-friends"]}>
        <span className={styles["highlight"]}>Друзья:</span>{" "}
        <span className={styles["result"]}>{friends}</span>
      </h2>
      {isEdit && (
        <div className={styles["buttons-edit"]}>
          <button className={styles["cancel"]} onClick={editProfile}>
            Отмена
          </button>
          <button onClick={handleSave}>Сохранить</button>
        </div>
      )}
    </>
  );
};
