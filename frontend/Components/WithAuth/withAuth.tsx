import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hook";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    const { id } = useAppSelector((state) => state.userReducer);
    useEffect(() => {
      if (!id) {
        router.push("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
