export const fetchUser = async (token, id) => {
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