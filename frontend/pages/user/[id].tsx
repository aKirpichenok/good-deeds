import { useRouter } from "next/router";
import { useAddFriendMutation } from "../../store/api/UserController";
import { FC, useState } from "react";
import { IUser } from "../../types/user";
import { fetchUser } from "../../utils/fetchers/fetchUser";
import { getToken } from "../../utils/cookies/getToken";
import Alert from "../../ui/src/Alert/Alert";

import styles from "./[id].module.sass";
import { getId } from "../../utils/cookies/getId";
import { fetchFriends } from "../../utils/fetchers/fetchFriends";

interface UserProps {
  user: IUser;
  token: string;
  isFriend?: boolean;
}

const User: FC<UserProps> = ({ user, token, isFriend }) => {
  const [addFriendTrigger] = useAddFriendMutation();
  const [error, setError] = useState<{
    isError: boolean;
    message: string;
    type: "warning" | "error" | "success";
  }>({
    isError: false,
    message: "",
    type: "warning",
  });
  const router = useRouter();

  const closeError = () => {
    setError((prev) => ({ ...prev, isError: false }));
  };

  const addFriendOne = async () => {
    try {
      const result: any = await addFriendTrigger({
        friendNickname: user.nickname,
        token,
      }).unwrap();
      router.push("/friends");
    } catch (e) {
      setError((prev) => ({
        ...prev,
        isError: true,
        message: e.data.message,
        type: "warning",
      }));
    }
  };

  return (
    <>
      {error.isError ? (
        <Alert message={error.message} type={error.type} onClose={closeError} />
      ) : (
        <div className={styles["user-page"]}>
          <div className={styles["user-page__main"]}>
            <p>
              <span className={styles["headers"]}>Имя:</span> {user.name}
            </p>
            <p>
              <span className={styles["headers"]}>Фамилия:</span> {user.female}
            </p>
            <p>
              <span className={styles["headers"]}>Никнейм:</span>{" "}
              {user.nickname}
            </p>
          </div>
          <div className={styles["user-page__additional"]}>
            <span>
              Кол-во друзей: <span>{user.friends.length || 0}</span>
            </span>
            <span>
              Кол-во постов: <span>{user.deeds.length || 0}</span>
            </span>
          </div>
          {isFriend && (
            <button onClick={addFriendOne}>Добавить в друзья</button>
          )}
        </div>
      )}
    </>
  );
};

export default User;

export async function getServerSideProps({ req, res, query }) {
  const { id } = query;
  const token = getToken(req);
  const user = await fetchUser(token, id);
  const friends = await fetchFriends(token);
  console.log(friends, user._id);
  const isFriend = !friends.find((friend) => friend._id == user._id);

  return {
    props: {
      user,
      token,
      isFriend,
    },
  };
}
