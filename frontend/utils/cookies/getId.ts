export const getId = (req) => {
  const cookies = req.headers.cookie.split("; ").find(item => item.startsWith('id'));
  const token = cookies.split("=")[1];
  return token
}