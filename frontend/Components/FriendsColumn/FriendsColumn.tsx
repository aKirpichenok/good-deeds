import { FC } from "react";
import { FriendCard } from "../FriendCard/FriendCard";
import { IUser } from "../../types/user";

export interface IUserWithId extends IUser {
  _id: string;
}

interface FriendsColumnProps {
  data: IUserWithId[];
  handleDelete: boolean | ((nickname: string) => void);
  emptyDataText: string;
  headerText: string;
}

export const FriendsColumn: FC<FriendsColumnProps> = ({
  data,
  handleDelete,
  emptyDataText,
  headerText,
}) => {
  return (
    <div>
      {data?.length === 0 ? (
        <p>{emptyDataText}</p>
      ) : (
        <div>
          <p
            style={{
              fontSize: "24px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {headerText}
          </p>
          {data?.map((friend) => (
            <FriendCard
              key={friend._id}
              {...friend}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
