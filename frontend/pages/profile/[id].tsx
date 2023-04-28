import { useState } from "react";
import withAuth from "../../Components/WithAuth/withAuth";
import {
  useChangeUserMutation,
  useDeleteUserMutation,
} from "../../store/api/UserController";
import { useAppDispatch, useAppSelector } from "../../store/hook";

import styles from "./index.module.sass";
import { addId } from "../../store/reducers/userReducer";
import { DeedItem } from "../../Components/DeedItem/DeedItem";
import { useRouter } from "next/router";
import { UserInfo } from "../../Components/UserInfo/userInfo";
import { fetchUser } from "../../utils/fetchers/fetchUser";

import Cookie from "js-cookie";

const Profile = ({ user }) => {
  console.log(user);
  const [deleteTrigger] = useDeleteUserMutation();
  const router = useRouter();

  const [changeTrigger] = useChangeUserMutation();
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const deleteProfile = () => {
    deleteTrigger(user._id);
    Cookie.router.push("/login");
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles["profile-page"]}>
      <div className={styles["edit"]}>
        <button onClick={editProfile}>Редактировать</button>
      </div>
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
            <li key={deed._id}>
              <DeedItem deed={deed} delete={false} />
            </li>
          ))}
        </ul>
      </div>
      <button className={styles["delete-button"]} onClick={deleteProfile}>
        Удалить профиль
      </button>
    </div>
  );
};

export default withAuth(Profile);

export async function getServerSideProps({ req, res, query }) {
  const { id } = query;
  const cookies = req.headers.cookie.split("; ");
  const token = cookies[cookies.length - 1].split("=")[1];
  const user = await fetchUser(token, id);
  return {
    props: { user },
  };
}
