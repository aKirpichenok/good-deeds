import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import Cookie from "js-cookie";
import { login } from "../../store/reducers/userReducer";
import { useLoginMutation } from "../../store/api/AuthController";

type AuthContextType = {
  currentUser: boolean | string;
  loginUser: (nickname: string, password: string) => void;
  logout: () => void;
  error: string;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loginUser: () => null,
  logout: () => null,
  error: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<boolean | string>(false);
  const [error, setError] = useState("");
  const [loginTrigger, _] = useLoginMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Cookie.get("token")) {
      setCurrentUser(Cookie.get("id"));
    }
  }, []);

  const logout = () => {
    Cookie.set("token", "", { expires: 0 });
    Cookie.set("id", "", { expires: 0 });
    setCurrentUser(false);
    router.push("/");
  };

  async function loginUser(nickname: string, password: string) {
    try {
      const result = await loginTrigger(
        JSON.stringify({ nickname: nickname, password }),
      ).unwrap();
      Cookie.set("token", result.token, { expires: 1 });
      Cookie.set("id", result.id, { expires: 1 });
      dispatch(login({ ...result }));
      setCurrentUser(result.id);
      router.push("/");
    } catch (e) {
      console.log(e);
      setError(e.data.message);
    }
  }

  const value = {
    currentUser,
    loginUser,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
