import { FC, useEffect } from "react";
import { useGetUserQuery } from "../../store/api/UserController";
import { useAppSelector } from "../../store/hook";
import { DeedItem } from "../DeedItem/DeedItem";

import styles from "./DeedList.module.sass";

interface OwnDeedsProps {
  isAdd: boolean;
}

export const OwnDeeds: FC<OwnDeedsProps> = ({ isAdd }) => {
  const { id } = useAppSelector((state) => state.userReducer);

  const { data, refetch, isLoading } = useGetUserQuery({ id });

  useEffect(() => {
    refetch();
  }, [isAdd]);

  return (
    <>
      {!isLoading &&
        data?.deeds?.map((deed) => (
          <li key={deed["_id"]} className={styles["deeds__item"]}>
            <DeedItem deed={deed} delete={true} refetch={refetch} />
          </li>
        ))}
    </>
  );
};
