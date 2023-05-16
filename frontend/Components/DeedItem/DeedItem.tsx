import { FC, useEffect, useState } from "react";
import { IDeed } from "../../types/deed";

import styles from "./DeedItem.module.sass";
import { useDeleteDeedMutation } from "../../store/api/DeedsController";

interface DeedItemProps {
  deed: IDeed;
  delete?: boolean;
  refetch?: () => void;
}

export const DeedItem: FC<DeedItemProps> = ({
  deed,
  delete: deleteDeed,
  refetch,
}) => {
  const [deleteTrigger] = useDeleteDeedMutation();
  const [date, setDate] = useState<string>();

  const handleDelete = async () => {
    const result = await deleteTrigger(deed._id).unwrap();
    refetch();
  };

  useEffect(() => {
    const date = new Date(deed.date);
    setDate(
      `${date.getDay()}-${
        date.getMonth() + 1
      }-${date.getFullYear()} in  ${date.getHours()}:${date.getMinutes()}`,
    );
  }, []);

  return (
    <div className={styles["deed-card"]}>
      <div className={styles["deed-header"]}>
        <h2>{deed.title}</h2>
        <span>{date}</span>
      </div>
      <div className={styles["deed-body"]}>
        <p>{deed.description}</p>
        <div className={styles["deed-footer"]}>
          <span>By {deed.nickname}</span>
        </div>
      </div>
      {deleteDeed && (
        <button className={styles["deed-delete"]} onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};
