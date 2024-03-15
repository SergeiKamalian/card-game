import { useCallback, useState } from "react";
import { useAppLoadingContext, useUserContext } from "../contexts";
import { TFriendFindRequest, TUser } from "../types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS } from "../constants";
import { useFirebase } from "./useFirebase";
import { notification } from "../ui";

export const useFriends = () => {
  const { setAppLoading } = useAppLoadingContext();
  const { user: currentUser, changeUser } = useUserContext();
  const [friendsRequests, setFriendsRequests] = useState<TUser[]>([]);
  const [userFriends, setUserFriends] = useState<TUser[]>([]);

  const [foundUsers, setFoundUsers] = useState<TUser[]>([]);

  const { changeData, getData } = useFirebase();

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
        const foundedUsers = users.filter(
          (user) =>
            currentUser?.friends.friendsIds.every((i) => i !== user.id) &&
            currentUser?.friends.requestsIds.every((i) => i !== user.id)
        );
        setFoundUsers(foundedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [setAppLoading]
  );

  const sendFriendRequest = useCallback(
    async (user: TUser) => {
      try {
        setAppLoading(true);
        if (!currentUser) return;
        const updatedUser: TUser = {
          ...user,
          friends: {
            friendsIds: user.friends.friendsIds,
            requestsIds: [
              ...user.friends.requestsIds.filter((id) => id !== user.id),
              currentUser.id,
            ],
          },
        };
        await changeData(FIREBASE_PATHS.USERS, String(user.id), updatedUser);
        notification("Friend request successfully sended!", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [changeData, currentUser, setAppLoading]
  );

  const initFriendsRequests = useCallback(async () => {
    if (!currentUser) return;
    try {
      setAppLoading(true);
      const promises = currentUser.friends.requestsIds.map(async (item) => {
        return await getData<TUser>(FIREBASE_PATHS.USERS, String(item));
      });
      const results = await Promise.all(promises);
      const filteredUsers: TUser[] = results.filter(
        (item): item is TUser => item !== undefined
      );
      setFriendsRequests(filteredUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setAppLoading(false);
    }
  }, [currentUser, getData, setAppLoading]);

  const acceptFriendRequest = useCallback(
    async (requestUserId: number) => {
      if (!currentUser) return;
      try {
        setAppLoading(true);
        const userFriend = await getData<TUser>(
          FIREBASE_PATHS.USERS,
          String(requestUserId)
        );
        if (!userFriend) return;
        const updatedCurrentUser: TUser = {
          ...currentUser,
          friends: {
            friendsIds: [...currentUser.friends.friendsIds, requestUserId],
            requestsIds: [
              ...currentUser.friends.requestsIds.filter(
                (id) => id !== requestUserId
              ),
            ],
          },
        };
        const updatedNewFriend: TUser = {
          ...userFriend,
          friends: {
            ...userFriend.friends,
            friendsIds: [
              ...userFriend.friends.friendsIds,
              updatedCurrentUser.id,
            ],
          },
        };
        await changeData(
          FIREBASE_PATHS.USERS,
          String(updatedCurrentUser.id),
          updatedCurrentUser
        );
        await changeData(
          FIREBASE_PATHS.USERS,
          String(updatedNewFriend.id),
          updatedNewFriend
        );
        setFriendsRequests((prev) =>
          prev.filter((user) => user.id !== requestUserId)
        );
        changeUser(updatedCurrentUser);
        notification("Friend request accepted!", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [changeData, changeUser, currentUser, getData, setAppLoading]
  );

  const rejectFriendRequest = useCallback(
    async (requestUserId: number) => {
      if (!currentUser) return;
      try {
        setAppLoading(true);
        const updatedCurrentUser: TUser = {
          ...currentUser,
          friends: {
            ...currentUser.friends,
            requestsIds: [
              ...currentUser.friends.requestsIds.filter(
                (id) => id !== requestUserId
              ),
            ],
          },
        };
        await changeData(
          FIREBASE_PATHS.USERS,
          String(currentUser.id),
          updatedCurrentUser
        );
        changeUser(updatedCurrentUser);
        setFriendsRequests((prev) =>
          prev.filter((user) => user.id !== requestUserId)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [changeData, changeUser, currentUser, setAppLoading]
  );

  const initUserFriends = useCallback(async () => {
    if (!currentUser) return;
    try {
      setAppLoading(true);
      const promises = currentUser.friends.friendsIds.map(async (item) => {
        return await getData<TUser>(FIREBASE_PATHS.USERS, String(item));
      });
      const results = await Promise.all(promises);
      const filteredUsers: TUser[] = results.filter(
        (item): item is TUser => item !== undefined
      );
      setUserFriends(filteredUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setAppLoading(false);
    }
  }, [currentUser, getData, setAppLoading]);

  return {
    foundUsers,
    friendsRequests,
    userFriends,
    findFriends,
    sendFriendRequest,
    initFriendsRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    initUserFriends
  };
};
