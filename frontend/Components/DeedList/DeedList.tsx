import { FC, useEffect } from "react";

import styles from "./DeedList.module.sass";
import { OwnDeeds } from "./OwnDeed";
import { FriendsDeeds } from "./FriendsDeed";
import { DeedItem } from "../DeedItem/DeedItem";

interface DeedListTypes {
  type: string;
  flag: any;
}

export const DeedList: FC<DeedListTypes> = ({ type, flag }) => {
  return (
    <ul className={styles["deeds__list"]}>
      {type === "own" ? (
        <OwnDeeds isAdd={flag} />
      ) : (
        <FriendsDeeds isAdd={flag} />
      )}
    </ul>
  );
};
