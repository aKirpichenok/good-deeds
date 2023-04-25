import { FriendCard } from "../../Components/FriendCard/FriendCard";
import withAuth from "../../Components/WithAuth/withAuth";

import styles from "./index.module.sass";
import { Input } from "../../ui/src/Input/Input";
import {
  useDeleteFriendMutation,
  useGetFriendsQuery,
  useSearchFriendsQuery,
} from "../../store/api/UserController";
import { useEffect, useState } from "react";
import { FriendsColumn } from "../../Components/FriendsColumn/FriendsColumn";

const Friends = () => {
  const { data, refetch, isLoading: isLoadingFriends } = useGetFriendsQuery({});
  const [searchText, setSearchText] = useState("");
  const { data: findUsers, isLoading } = useSearchFriendsQuery(searchText);

  const [deleteTrigger] = useDeleteFriendMutation();

  const handleDelete = async (nickname) => {
    await deleteTrigger(
      JSON.stringify({
        friendNickname: nickname,
      }),
    ).unwrap();
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

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
        {isLoadingFriends ? (
          <p>Loading</p>
        ) : (
          <FriendsColumn
            data={data}
            handleDelete={handleDelete}
            emptyDataText="У вас нет друзей"
          />
        )}
        {isLoading ? (
          <p>loading</p>
        ) : (
          <FriendsColumn
            data={findUsers}
            emptyDataText="Никого не нашли"
            handleDelete={false}
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(Friends);