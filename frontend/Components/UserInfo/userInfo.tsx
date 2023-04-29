import { FC, useState } from "react";
import { Input } from "../../ui/src/Input/Input";

import styles from "./userInfo.module.sass";
import { IUserWithId } from "../FriendsColumn/FriendsColumn";

interface UserInfoProps {
  isEdit: boolean;
  editProfile: () => void;
  submitEdit: any;
  user: IUserWithId;
}

export const UserInfo: FC<UserInfoProps> = ({
  isEdit,
  editProfile,
  submitEdit,
  user,
}) => {
  const [newName, setName] = useState(user.name);
  const [newFemale, setFemale] = useState(user.female);
  const [newNickname, setNickname] = useState(user.nickname);

  const arr = [
    {
      headerValue: "Имя",
      value: newName,
      callback: (e) => setName(e.target.value),
      oldValue: user.name,
    },
    {
      headerValue: "Фамилия",
      value: newFemale,
      callback: (e) => setFemale(e.target.value),
      oldValue: user.female,
    },
    {
      headerValue: "Никнейм",
      value: newNickname,
      callback: (e) => setNickname(e.target.value),
      oldValue: user.nickname,
    },
  ];

  const handleSave = () => {
    submitEdit({ newName, newFemale, newNickname });
  };

  return (
    <>
      {arr.map((field, index) =>
        isEdit ? (
          <Input
            label={field.headerValue}
            onChange={field.callback}
            placeholder={field.headerValue}
            type="text"
            value={field.value}
            key={index}
          />
        ) : (
          <div className={styles["fields-container"]}>
            <h2>{field.headerValue}</h2>
            <span>{field.oldValue}</span>
          </div>
        ),
      )}
      <h2 className={styles["profile-friends"]}>
        <span className={styles["highlight"]}>Друзья:</span>{" "}
        <span className={styles["result"]}>{user?.friends?.length || 0}</span>
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
