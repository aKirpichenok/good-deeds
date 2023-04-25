import { useEffect, useState } from "react";
import { useGetFriendsQuery } from "../../store/api/UserController";
import { DeedItem } from "../DeedItem/DeedItem";

import styles from "./DeedList.module.sass";

export const FriendsDeeds = () => {
  const { data, isLoading, refetch } = useGetFriendsQuery({});
  const [deeds, setDeeds] = useState([]);

  useEffect(() => {
    refetch();
    const deeds = data?.reduce((acc, friend) => {
      if (friend.deeds.length > 0) acc.push(...friend.deeds);
      return acc;
    }, []);
    setDeeds(deeds);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          {deeds?.map((deed) => (
            <li key={deed["_id"]} className={styles["deeds__item"]}>
              <DeedItem deed={deed} delete={false} refetch={refetch} />
            </li>
          ))}
        </>
      )}
    </>
  );
};
