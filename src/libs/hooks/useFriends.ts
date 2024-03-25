import { useCallback, useState } from "react";
import { useAppLoadingContext, useUserContext } from "../contexts";
import { TConnectedUser, TFriendFindRequest, TNotification, TUser } from "../types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS, GAME_REQUEST_TIME } from "../constants";
import { useFirebase } from "./useFirebase";
import { notification } from "../ui";
import { calculateGamerStepTime } from "../utils";
import { useGameConnection } from "./useGameConnection";

export const useFriends = () => {
  const { setAppLoading } = useAppLoadingContext();
  const { user: currentUser, changeUser } = useUserContext();
  const { joinToGame } = useGameConnection();
  const [friendsRequests, setFriendsRequests] = useState<TUser[]>([]);
  const [userFriends, setUserFriends] = useState<TUser[]>([]);

  const [foundUsers, setFoundUsers] = useState<TUser[]>([]);

  const { changeData, getData, getRealtimeData, changeRealtimeData } = useFirebase();

  const findFriends = useCallback(
    async (values: TFriendFindRequest) => {
      try {
        setAppLoading(true);
        console.log(values.userName);
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
        console.log(currentUser);
        const foundedUsers = users.filter(
          (user) =>
            currentUser?.friends.friendsIds.every((i) => i !== user.id) &&
            currentUser?.friends.requestsIds.every((i) => i !== user.id)
        );
        console.log(foundedUsers);
        setFoundUsers(users);
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [currentUser, setAppLoading]
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

  const sendGameRequestToFriend = useCallback(
    async (userId: number, gameId: number) => {
      if (!currentUser) return;
      try {
        setAppLoading(true);
        const foundData = await getRealtimeData<TConnectedUser>(FIREBASE_PATHS.CONNECTED_USERS, String(userId));

        if (!foundData) return;

        if (foundData?.gameRequest) {
          notification("User is have active game request", "error");
          return;
        }

        const finishedAt = String(calculateGamerStepTime(GAME_REQUEST_TIME));
        const gameRequest = {
          id: gameId,
          finishedAt,
          friendId: currentUser.id,
        };
        const newData = { ...foundData, gameRequest };

        await changeRealtimeData(FIREBASE_PATHS.CONNECTED_USERS, String(userId), newData)
        notification("Game request successfully sended!", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [changeRealtimeData, currentUser, getRealtimeData, setAppLoading]
  );

  const rejectGameRequest = useCallback(async () => {
    if (!currentUser) return;
    try {
      setAppLoading(true);
      const foundData = await getRealtimeData<TConnectedUser>(FIREBASE_PATHS.CONNECTED_USERS, String(currentUser.id));
      if (!foundData) return;
      delete foundData.gameRequest
      await changeRealtimeData(FIREBASE_PATHS.CONNECTED_USERS, String(currentUser.id), foundData)
    } catch (error) {
      console.error(error);
    } finally {
      setAppLoading(false);
    }
  }, [changeRealtimeData, currentUser, getRealtimeData, setAppLoading]);

  const acceptGameRequest = useCallback(async () => {
    if (!currentUser) return;
    try {
      setAppLoading(true);
      const foundData = await getRealtimeData<TConnectedUser>(FIREBASE_PATHS.CONNECTED_USERS, String(currentUser.id));
      if (!foundData?.gameRequest) return;
      await joinToGame({ code: String(foundData.gameRequest.id) });
      delete foundData.gameRequest
      await changeRealtimeData(FIREBASE_PATHS.CONNECTED_USERS, String(currentUser.id), foundData)
    } catch (error) {
      console.error(error);
    } finally {
      setAppLoading(false);
    }
  }, [changeRealtimeData, currentUser, getRealtimeData, joinToGame, setAppLoading]);

  return {
    foundUsers,
    friendsRequests,
    userFriends,
    findFriends,
    sendFriendRequest,
    initFriendsRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    initUserFriends,
    sendGameRequestToFriend,
    rejectGameRequest,
    acceptGameRequest
  };
};
