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
}

export const FriendsColumn: FC<FriendsColumnProps> = ({
  data,
  handleDelete,
  emptyDataText,
}) => {
  return (
    <>
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
            Друзья:
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
    </>
  );
};
