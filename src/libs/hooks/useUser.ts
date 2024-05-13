import { useCallback, useState } from "react";
import { TUser } from "../types";
import { APP_ROUTES, FIREBASE_PATHS } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "./useFirebase";

export const useUser = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { changeData, getData } = useFirebase();

  const [user, setUser] = useState<null | TUser>(null);
  const [userAuthStatus, setUserAuthStatus] = useState(false);

  const changeUser = useCallback(
    (user: TUser | null) => {
      setUser(user);
      setUserAuthStatus(Boolean(user));
      if (pathname === APP_ROUTES.AUTHORIZATION) {
        navigate(APP_ROUTES.PROFILE);
      }
    },
    [navigate, pathname]
  );

  const changeUserCoinsCount = useCallback(
    async (id: number, type: "increment" | "decrement", coins: number) => {
      const user = await getData<TUser>(FIREBASE_PATHS.USERS, String(id));
      if (!user) return;
      const newCoins =
        type === "increment" ? user.coins + coins : user.coins - coins;
      const updatedUser: TUser = {
        ...user,
        coins: newCoins,
      };
      await changeData(FIREBASE_PATHS.USERS, String(id), updatedUser);
      return updatedUser;
    },
    [changeData, getData]
  );

  return {
    userAuthStatus,
    user,
    changeUser,
    changeUserCoinsCount
  };
};
