import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { database } from "../configs";
import { FIREBASE_PATHS } from "../constants";
import { TConnectedUser, TGame, TGameRequest, TNotification, TUser, TUserRequest } from "../types";
import { useUserContext } from "../contexts";
import { useFirebase } from "./useFirebase";
import { getDatabase, onValue, ref } from "firebase/database";

export const useGames = () => {
  const { user } = useUserContext();
  const { getData, getRealtimeData } = useFirebase();

  const [games, setGames] = useState<TGame[]>([]);
  const [activeGameRequest, setActiveGameRequest] =
    useState<TGameRequest | null>(null);

  const followToGamesCollection = useCallback(() => {
    const q = query(
      collection(database, FIREBASE_PATHS.GAMES),
      where("private", "==", false),
      where("started", "==", false)
    );
    const unSub = onSnapshot(q, (snapshot) => {
      const games: TGame[] = [];
      snapshot.forEach((snap) => {
        games.push(snap.data() as TGame);
      });
      setGames(games);
    });
    return () => {
      unSub();
    };
  }, []);

  const followToGameRequestCollection = useCallback(() => {
    if (!user) return;
    const db = getDatabase();
    const userRef = ref(db, `${FIREBASE_PATHS.CONNECTED_USERS}/${user.id}`);
    const unSub = onValue(userRef, async (userSnapshot) => {
      if (!userSnapshot.exists()) {
        setActiveGameRequest(null);
        return;
      };
      const userInfo = userSnapshot.val() as TConnectedUser;
      if (!userInfo.gameRequest) {
        setActiveGameRequest(null);
        return;
      }
      const { finishedAt, friendId, id } = userInfo.gameRequest
      const game = await getRealtimeData<TGame>(FIREBASE_PATHS.GAMES, String(id));
      const requestUser = await getData<TUser>(FIREBASE_PATHS.USERS, String(friendId));
      if (!game || !requestUser) return;
      setActiveGameRequest({ finishedAt, game, requestUser });
    })
    return () => {
      unSub();
    };
  }, [getData, getRealtimeData, user]);

  useEffect(followToGamesCollection, [followToGamesCollection]);
  useEffect(followToGameRequestCollection, [followToGameRequestCollection]);

  return {
    games,
    activeGameRequest,
    setActiveGameRequest,
  };
};
