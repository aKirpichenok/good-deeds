import { FC, useEffect } from "react";

import styles from "./DeedList.module.sass";
import { OwnDeeds } from "./OwnDeed";
import { FriendsDeeds } from "./FriendsDeed";
import { DeedItem } from "../DeedItem/DeedItem";

interface DeedListTypes {
  type: string;
  flag: boolean;
}

export const DeedList: FC<DeedListTypes> = ({ type, flag }) => {
  switch (type) {
    case "own":
      return <OwnDeeds isAdd={flag} />;
    case "friends":
      return <FriendsDeeds isAdd={flag} />;
  }
};
