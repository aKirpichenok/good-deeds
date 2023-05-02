import styles from "./index.module.sass";
import { Input } from "../../ui/src/Input/Input";
import { useSearchFriendsQuery } from "../../store/api/UserController";
import { useState } from "react";
import { FriendsColumn } from "../../Components/FriendsColumn/FriendsColumn";
import { fetchFriends } from "../../utils/fetchers/fetchFriends";
import { getToken } from "../../utils/cookies/getToken";

const Friends = ({ userFriends: data, token, friendsId }) => {
  const [searchText, setSearchText] = useState("");
  const [friends, setFriends] = useState(data);
  const { data: findUsers, isLoading } = useSearchFriendsQuery(
    { nickname: searchText, friendsId },
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
    const text = await result.json();
    console.log("RESULT", text);
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

export default Friends;

export async function getServerSideProps({ req, res }) {
  const token = getToken(req);

  const data = await fetchFriends(token);
  const friendsId = data.reduce((acc, friend) => [...acc, friend.nickname], []);

  return {
    props: {
      userFriends: data,
      token,
      friendsId,
    },
  };
}
