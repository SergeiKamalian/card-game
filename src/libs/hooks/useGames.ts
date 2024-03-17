import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { database } from "../configs";
import { FIREBASE_PATHS } from "../constants";
import { TGame, TGameRequest, TNotification, TUser } from "../types";
import { useUserContext } from "../contexts";
import { useFirebase } from "./useFirebase";

export const useGames = () => {
  const { user } = useUserContext();
  const { getData } = useFirebase();

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
    const unSub = onSnapshot(
      doc(database, FIREBASE_PATHS.USERS_NOTIFICATIONS, String(user.id)),
      async (doc) => {
        const notification = doc.data() as TNotification;
        if (!notification?.game) {
          setActiveGameRequest(null);
          return;
        }
        const { code, finishedAt, requestUserId } = notification.game;
        const game = await getData<TGame>(FIREBASE_PATHS.GAMES, code);
        const requestUser = await getData<TUser>(
          FIREBASE_PATHS.USERS,
          String(requestUserId)
        );
        if (!game || !requestUser) return;
        setActiveGameRequest({ finishedAt, game, requestUser });
      }
    );
    return () => {
      unSub();
    };
  }, [getData, user]);

  useEffect(followToGamesCollection, [followToGamesCollection]);
  useEffect(followToGameRequestCollection, [followToGameRequestCollection]);

  return {
    games,
    activeGameRequest,
    setActiveGameRequest,
  };
};
