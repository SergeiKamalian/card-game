import { useCallback, useState } from "react";
import { useAppLoadingContext } from "../contexts";
import { TFriendFindRequest, TUser } from "../types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS } from "../constants";

export const useFriends = () => {
  const { setAppLoading } = useAppLoadingContext();

  const [foundUsers, setFoundUsers] = useState<TUser[]>([]);

  const findFriends = useCallback(
    async (values: TFriendFindRequest) => {
      try {
        setAppLoading(true);
        const usersRef = collection(database, FIREBASE_PATHS.USERS);
        const q = query(
          usersRef,
          where("name", ">=", values.userName),
          where("name", "<=", values.userName + "\uf8ff")
        );
        const snapshot = await getDocs(q);
        const users: TUser[] = [];
        snapshot.forEach((doc) => {
          const user = doc.data() as TUser;
          users.push(user);
        });
        setFoundUsers(users);
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [setAppLoading]
  );

  const sendFriendRequest = useCallback(async (user: TUser) => {
    try {
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { findFriends, foundUsers, sendFriendRequest };
};
