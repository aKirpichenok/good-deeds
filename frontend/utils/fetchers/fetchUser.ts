import { IUserWithId } from "../../Components/FriendsColumn/FriendsColumn";

export const fetchUser = async (token: string, id: string): Promise<IUserWithId> => {
  const result = await fetch(`http://localhost:5001/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await result.json();
  return user
}