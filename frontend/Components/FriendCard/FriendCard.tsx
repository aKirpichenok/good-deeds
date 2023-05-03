import Link from "next/link";
import styles from "./FriendCard.module.sass";
import { FC } from "react";
import { IUser } from "../../types/user";

interface FriendCardProps extends IUser {
  _id: string;
  handleDelete: boolean | ((e: string) => void);
}

export const FriendCard: FC<FriendCardProps> = ({
  name,
  female,
  nickname,
  friends,
  deeds,
  _id,
  handleDelete,
}) => {
  return (
    <div className={styles["friend-card__wrapper"]}>
      <Link
        className={styles["friend-card"]}
        href={{ pathname: `user/${_id}` }}
      >
        <h3 className={styles["friend-card__name"]}>Имя: {name}</h3>
        <p className={styles["friend-card__female"]}>Фамилия: {female}</p>
        <span className={styles["friend-card__friend"]}>
          Друзей: {friends.length}
        </span>
        <span className={styles["friend-card__deeds"]}>
          Добрых дел: {deeds.length}
        </span>
        <span className={styles["friend-card__nickname"]}>
          Nickname: {nickname}
        </span>
      </Link>
      {handleDelete && typeof handleDelete == "function" && (
        <button
          className={styles["friend-card__delete"]}
          onClick={() => handleDelete(nickname)}
        >
          удалить
        </button>
      )}
    </div>
  );
};
