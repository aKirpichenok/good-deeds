import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import Cookie from "js-cookie";
import { login } from "../../store/reducers/userReducer";
import { useLoginMutation } from "../../store/api/AuthController";

type AuthContextType = {
  currentUser: boolean;
  loginUser: (nickname: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loginUser: () => null,
  logout: () => null,
});

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<boolean>(false);
  const [loginTrigger, _] = useLoginMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = () => {
    Cookie.set("token", "", { expires: 0 });
    setCurrentUser(false);
    router.push("/");
  };

  async function loginUser(nickname: string, password: string) {
    try {
      const result = await loginTrigger(
        JSON.stringify({ nickname: nickname, password }),
      ).unwrap();
      Cookie.set("token", result.token, { expires: 7 });

      dispatch(login({ ...result }));
      // const cookieSend = await fetch("http://localhost:5001/auth/setCookie", {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer thisisCookie`,
      //   },
      // });
      // const yap = await cookieSend.text();
      // const deleteCookie = await fetch(
      //   "http://localhost:5001/auth/removeCookie",
      // );
      // const text = await deleteCookie.text();
      // console.log(text);
      setCurrentUser(true);
      // router.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  const value = {
    currentUser,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
