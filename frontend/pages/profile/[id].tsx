import { useState } from "react";
import {
  useChangeUserMutation,
  useDeleteUserMutation,
} from "../../store/api/UserController";

import styles from "./index.module.sass";
import { DeedItem } from "../../Components/DeedItem/DeedItem";
import { UserInfo } from "../../Components/UserInfo/userInfo";
import { fetchUser } from "../../utils/fetchers/fetchUser";

import Cookie from "js-cookie";
import { getToken } from "../../utils/cookies/getToken";

const Profile = ({ user, token, id }) => {
  const [deleteTrigger] = useDeleteUserMutation();
  const [changeTrigger] = useChangeUserMutation();

  const [state, setState] = useState(user);
  const [isEdit, setIsEdit] = useState(false);

  const deleteProfile = () => {
    deleteTrigger(user._id);
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
      const data = await fetchUser(token, id);
      setState(data);
      Cookie.set("token", result.token, {
        expires: 1,
        // secure: true,
        // httpOnly: true,
      });
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
          user={state}
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

export default Profile;

export async function getServerSideProps({ req, res, query }) {
  const { id } = query;
  const token = getToken(req);
  const user = await fetchUser(token, id);
  console.log("USER", user);
  return {
    props: { user, token, id },
  };
}
