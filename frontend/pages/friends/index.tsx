import { FriendCard } from "../../Components/FriendCard/FriendCard";
import withAuth from "../../Components/WithAuth/withAuth";

import styles from "./index.module.sass";
import { Input } from "../../ui/src/Input/Input";
import { useSearchFriendsQuery } from "../../store/api/UserController";
import { useState } from "react";
import { FriendsColumn } from "../../Components/FriendsColumn/FriendsColumn";
import { useAppSelector } from "../../store/hook";
import { fetchFriends } from "../../utils/fetchers/fetchFriends";

const Friends = ({ userFriends: data, token }) => {
  const [searchText, setSearchText] = useState("");
  const [friends, setFriends] = useState(data);
  const { nickname } = useAppSelector((state) => state.userReducer);
  const { data: findUsers, isLoading } = useSearchFriendsQuery(
    { nickname: searchText, userNickname: nickname, token },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const handleDelete = async (nickname) => {
    const result = await fetch("http://localhost:5001/users/delete/friend", {
      method: "POST",
      body: JSON.stringify({ friendNickname: nickname }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await fetchFriends(token);
    setFriends(data);
  };

  return (
    <div className={styles["friends-list"]}>
      <div className={styles["friends-search"]}>
        <Input
          label=""
          placeholder="поиск друзей"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className={styles["friends-deeds"]}>
        <FriendsColumn
          data={friends}
          handleDelete={handleDelete}
          emptyDataText="У вас нет друзей"
          headerText="Друзья:"
        />
        {isLoading ? (
          <p>loading</p>
        ) : (
          <FriendsColumn
            data={findUsers}
            emptyDataText="Никого не нашли"
            handleDelete={false}
            headerText="Результаты поиска:"
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(Friends);

export async function getServerSideProps({ req, res }) {
  const cookies = req.headers.cookie.split("; ");
  const token = cookies[cookies.length - 1].split("=")[1];
  console.log("COOKIES", cookies);

  const data = await fetchFriends(token);

  return {
    props: {
      userFriends: data,
      token,
    },
  };
}
