import { IUserWithId } from "../../Components/FriendsColumn/FriendsColumn";

export const fetchFriends = async (token): Promise<IUserWithId[]> => {
  const result = await fetch("http://localhost:5001/users/get/friends", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  const data = await result.json();
  return data;
};