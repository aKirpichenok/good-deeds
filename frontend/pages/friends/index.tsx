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
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { deleteFriend } from "../../store/reducers/userReducer";

const Friends = () => {
  const { data, refetch, isLoading: isLoadingFriends } = useGetFriendsQuery({});
  const [searchText, setSearchText] = useState("");
  const { nickname } = useAppSelector((state) => state.userReducer);
  const { data: findUsers, isLoading } = useSearchFriendsQuery(
    { nickname: searchText, userNickname: nickname },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const { friends } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const [deleteTrigger] = useDeleteFriendMutation();

  const handleDelete = async (nickname) => {
    const result = await deleteTrigger(
      JSON.stringify({
        friendNickname: nickname,
      }),
    ).unwrap();
    dispatch(deleteFriend(friends - 1));
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
