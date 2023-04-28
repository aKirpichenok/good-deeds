import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import Cookie from "js-cookie";
import {
  login,
  addFriend,
  addId,
  addNickname,
  changeName,
} from "../../store/reducers/userReducer";
import { useLoginMutation } from "../../store/api/AuthController";

type AuthContextType = {
  currentUser: any;
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginTrigger, _] = useLoginMutation();
  const state = useAppSelector((state) => state.userReducer);
  const route = useRouter();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = () => {
    Cookie.remove("token");
    console.log("sdsd");
    route.push("/");
  };

  async function loginUser(nickname: string, password: string) {
    try {
      const result = await loginTrigger(
        JSON.stringify({ nickname: nickname, password: password }),
      ).unwrap();
      dispatch(login({ ...result }));
      Cookie.set("token", result.token, { expires: 1 });
      router.push("/");
    } catch (e) {
      console.log(e);
      // setError(e?.data?.message);
    }
  }

  const value = {
    currentUser,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
