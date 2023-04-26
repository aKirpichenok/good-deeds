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
import { UserInfo } from "./userInfo";

const Profile = () => {
  const { id, friends } = useAppSelector((state) => state.userReducer);
  const { data: user, isLoading } = useGetUserQuery({ id, friends });
  const [deleteTrigger] = useDeleteUserMutation();
  const router = useRouter();

  const [changeTrigger] = useChangeUserMutation();
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const deleteProfile = () => {
    deleteTrigger(user._id);
    localStorage.removeItem("token");
    router.push("/login");
  };

  const editProfile = () => {
    setIsEdit((prev) => !prev);
  };

  const handleClick = async ({ newName, newNickname, newFemale }) => {
    try {
      const result = await changeTrigger(
        JSON.stringify({
          ...user,
          name: newName,
          female: newFemale,
          nickname: newNickname,
        }),
      ).unwrap();
      editProfile();
      localStorage.setItem("token", result.token);
      dispatch(addId(result.id));
      // dispatch(addNickname(result.nickname));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles["profile-page"]}>
      <div className={styles["edit"]}>
        <button onClick={editProfile}>Редактировать</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles["left-side"]}>
            <UserInfo
              isEdit={isEdit}
              editProfile={editProfile}
              submitEdit={handleClick}
            />
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
