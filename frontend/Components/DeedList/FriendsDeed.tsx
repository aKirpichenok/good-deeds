import { useEffect, useState } from "react";
import { useGetFriendsDeedQuery } from "../../store/api/UserController";
import { DeedItem } from "../DeedItem/DeedItem";

import styles from "./DeedList.module.sass";

export const FriendsDeeds = ({ isAdd }: { isAdd: boolean }) => {
  const { data, isLoading, refetch } = useGetFriendsDeedQuery({});

  useEffect(() => {
    refetch();
  }, [isAdd]);

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          {data?.length == 0 ? (
            <span>Пусто</span>
          ) : (
            data?.map((deed) => (
              <li key={deed["_id"]} className={styles["deeds__item"]}>
                <DeedItem deed={deed} delete={false} refetch={refetch} />
              </li>
            ))
          )}
        </>
      )}
    </>
  );
};
