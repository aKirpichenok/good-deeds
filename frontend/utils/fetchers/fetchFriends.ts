export const fetchFriends = async (token) => {
  const result = await fetch("http://localhost:5001/users/get/friends", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  return data;
};