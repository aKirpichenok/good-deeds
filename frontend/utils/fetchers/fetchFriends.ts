import { IUser } from "../../types/user";

export const fetchFriends = async (token): Promise<IUser[]> => {
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