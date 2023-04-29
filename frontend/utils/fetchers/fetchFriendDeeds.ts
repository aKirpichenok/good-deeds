export const fetchFriendDeeds = async (token) => {
  const result = await fetch(`http://localhost:5001/users/get/friends/deeds`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const deeds = await result.json();
  return deeds
}