import { useEffect, useState } from "react";
import { useGetFriendsDeedQuery } from "../../store/api/UserController";
import { DeedItem } from "../DeedItem/DeedItem";

import styles from "./DeedList.module.sass";

export const FriendsDeeds = () => {
  const [deeds, setDeeds] = useState([]);
  const { data, isLoading, refetch } = useGetFriendsDeedQuery({});

  useEffect(() => {
    setDeeds(data);
    refetch();
  }, [data]);

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
