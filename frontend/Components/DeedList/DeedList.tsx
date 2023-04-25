import { FC, useEffect } from "react";

import styles from "./DeedList.module.sass";
import { OwnDeeds } from "./OwnDeed";
import { FriendsDeeds } from "./FriendsDeed";

interface DeedListTypes {
  type: string;
  flag: boolean;
}

export const DeedList: FC<DeedListTypes> = ({ type, flag }) => {
  return (
    <ul className={styles["deeds__list"]}>
      {type === "own" ? <OwnDeeds isAdd={flag} /> : <FriendsDeeds />}
    </ul>
  );
};
