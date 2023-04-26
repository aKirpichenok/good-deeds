import { useRouter } from "next/router";
import {
  useAddFriendMutation,
  useGetUserQuery,
} from "../../store/api/UserController";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addFriend } from "../../store/reducers/userReducer";

interface UserProps {
  id: string;
}

const User: FC<UserProps> = ({ id }) => {
  const { data: user, isLoading } = useGetUserQuery({ id });
  const [addFriendTrigger] = useAddFriendMutation();
  const router = useRouter();
  const { friends } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const addFriendOne = async () => {
    const result: any = await addFriendTrigger(
      JSON.stringify({
        friendNickname: user.nickname,
      }),
    ).unwrap();
    console.log("RESULT", result);
    router.push("/friends");
    dispatch(addFriend(friends + 1));
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
          <button onClick={addFriendOne}>Добавить в друзья</button>
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
