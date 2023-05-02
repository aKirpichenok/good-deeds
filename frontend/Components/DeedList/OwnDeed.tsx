import { FC, useEffect } from "react";
import { useGetUserQuery } from "../../store/api/UserController";
import { DeedItem } from "../DeedItem/DeedItem";

import styles from "./DeedList.module.sass";

interface OwnDeedsProps {
  isAdd: boolean;
}

export const OwnDeeds: FC<OwnDeedsProps> = ({ isAdd }) => {
  const { data, refetch, isLoading } = useGetUserQuery({});

  useEffect(() => {
    refetch();
  }, [isAdd]);
  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        data?.deeds?.map((deed) => (
          <li key={deed["_id"]} className={styles["deeds__item"]}>
            <DeedItem deed={deed} delete={true} refetch={refetch} />
          </li>
        ))
      )}
    </>
  );
};
