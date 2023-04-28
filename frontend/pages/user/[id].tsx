import { useRouter } from "next/router";
import { useAddFriendMutation } from "../../store/api/UserController";
import { FC } from "react";
import { IUser } from "../../types/user";
import { fetchUser } from "../../utils/fetchers/fetchUser";

interface UserProps {
  user: IUser;
  token: string;
}

const User: FC<UserProps> = ({ user, token }) => {
  const [addFriendTrigger] = useAddFriendMutation();
  const router = useRouter();

  const addFriendOne = async () => {
    const result: any = await addFriendTrigger({
      friendNickname: user.nickname,
      token,
    }).unwrap();
    router.push("/friends");
  };

  return (
    <>
      <div>
        <p>Имя: {user.name}</p>
        <p>Фамилия: {user.female}</p>
        <p>Никнейм: {user.nickname}</p>
        <button onClick={addFriendOne}>Добавить в друзья</button>
      </div>
    </>
  );
};

export default User;

export async function getServerSideProps({ req, res, query }) {
  console.log(query.id);
  const { id } = query;
  const cookies = req.headers.cookie.split("; ");
  const token = cookies[cookies.length - 1].split("=")[1];
  const user = fetchUser(token, id);

  return {
    props: {
      user,
      token,
    },
  };
}
