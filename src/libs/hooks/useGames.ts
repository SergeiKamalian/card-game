import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { database } from "../configs";
import { FIREBASE_PATHS } from "../constants";
import { TGame } from "../types";

export const useGames = () => {
  const [games, setGames] = useState<TGame[]>([]);

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

  useEffect(followToGamesCollection, [followToGamesCollection]);

  return {
    games
  };
};
