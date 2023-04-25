import { useRouter } from "next/router";

export const ErrorUI = () => {
  const route = useRouter();

  const handleClick = () => {
    route.pathname = "http://localhost:3000/";
    route.reload();
  };

  return (
    <div>
      <h2>Что-от пошло не так</h2>
      <button onClick={handleClick}>вернуться</button>
    </div>
  );
};
