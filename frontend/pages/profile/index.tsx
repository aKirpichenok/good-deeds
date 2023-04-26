import { useEffect, useState } from "react";
import withAuth from "../../Components/WithAuth/withAuth";
import {
  useChangeUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../store/api/UserController";
import { useAppDispatch, useAppSelector } from "../../store/hook";

import styles from "./index.module.sass";
import { Input } from "../../ui/src/Input/Input";
import { addId, addNickname } from "../../store/reducers/userReducer";
import { DeedItem } from "../../Components/DeedItem/DeedItem";
import { useRouter } from "next/router";

const Profile = () => {
  const { id, friends } = useAppSelector((state) => state.userReducer);
  const { data: user, isLoading } = useGetUserQuery({ id, friends });
  console.log("USER", user);
  const [changeTrigger] = useChangeUserMutation();
  const [deleteTrigger] = useDeleteUserMutation();
  const [name, setName] = useState("");
  const [female, setFemale] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setName(user?.name);
    setFemale(user?.female);
    setNickname(user?.nickname);
  }, [user]);

  const handleClick = async () => {
    try {
      const result = await changeTrigger(
        JSON.stringify({
          ...user,
          name,
          female,
          nickname,
        }),
      ).unwrap();
      setIsEdit((prev) => !prev);
      localStorage.setItem("token", result.token);
      dispatch(addId(result.id));
      dispatch(addNickname(result.nickname));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProfile = () => {
    deleteTrigger(user._id);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className={styles["profile-page"]}>
      <div className={styles["edit"]}>
        <button onClick={() => setIsEdit((prev) => !prev)}>
          Редактировать
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles["left-side"]}>
            <h2>
              <span className={styles["highlight"]}>Имя:</span>
              {isEdit ? (
                <Input
                  label=""
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                  type="text"
                  value={name}
                />
              ) : (
                <span className={styles["result"]}>{name}</span>
              )}
            </h2>
            <h2>
              <span className={styles["highlight"]}>Фамилия:</span>
              {isEdit ? (
                <Input
                  label=""
                  onChange={(e) => setFemale(e.target.value)}
                  placeholder=""
                  type="text"
                  value={female}
                />
              ) : (
                <span className={styles["result"]}>{female}</span>
              )}
            </h2>
            <h2>
              <span className={styles["highlight"]}>Никнейм:</span>
              {isEdit ? (
                <Input
                  label=""
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder=""
                  type="text"
                  value={nickname}
                />
              ) : (
                <span className={styles["result"]}>{nickname}</span>
              )}
            </h2>
            <h2 className={styles["profile-friends"]}>
              <span className={styles["highlight"]}>Друзья:</span>{" "}
              <span className={styles["result"]}>{friends}</span>
            </h2>
            {isEdit && (
              <div className={styles["buttons-edit"]}>
                <button
                  className={styles["cancel"]}
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  Отмена
                </button>
                <button onClick={handleClick}>Сохранить</button>
              </div>
            )}
          </div>

          <div className={styles["right-side"]}>
            <span className={styles["highlight"]}>Посты:</span>{" "}
            <ul>
              {user?.deeds.map((deed) => (
                <li>
                  <DeedItem deed={deed} delete={false} />
                </li>
              ))}
            </ul>
          </div>
          <button className={styles["delete-button"]} onClick={deleteProfile}>
            Удалить профиль
          </button>
        </>
      )}
    </div>
  );
};

export default withAuth(Profile);
