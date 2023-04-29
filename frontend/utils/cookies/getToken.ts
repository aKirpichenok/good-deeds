export const getToken = (req) => {
  const cookies = req.headers.cookie.split("; ").find(item => item.includes('token'));
  const token = cookies.split("=")[1];
  return token
}