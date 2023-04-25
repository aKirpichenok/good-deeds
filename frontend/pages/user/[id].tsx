import { useRouter } from "next/router";
import {
  useAddFriendMutation,
  useGetUserQuery,
} from "../../store/api/UserController";
import { FC } from "react";

interface UserProps {
  id: string;
}

const User: FC<UserProps> = ({ id }) => {
  const { data: user, isLoading } = useGetUserQuery(id);
  const [addFriendTrigger] = useAddFriendMutation();
  const router = useRouter();

  const addFriend = async () => {
    const result = await addFriendTrigger(
      JSON.stringify({
        friendNickname: user.nickname,
      }),
    ).unwrap();
    router.push("/friends");
  };

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div>
          <p>Имя: {user.name}</p>
          <p>Фамилия: {user.female}</p>
          <p>Никнейм: {user.nickname}</p>
          <button onClick={addFriend}>Добавить в друзья</button>
        </div>
      )}
    </>
  );
};

export default User;

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}
