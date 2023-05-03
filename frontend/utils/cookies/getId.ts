export const getId = (req): string => {
  const cookies = req.headers.cookie.split("; ").find(item => item.startsWith('id'));
  const token = cookies.split("=")[1];
  return token
}