import { useCallback, useState } from "react";
import { useFirebase } from "./useFirebase";
import { FIREBASE_PATHS } from "../constants";
import { TCard } from "../types";

export const useAppInitialization = () => {
  const { getCollection } = useFirebase();
  const [cards, setCards] = useState<null | TCard[]>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [timerTexts, setTimerTexts] = useState<(string | number)[]>([]);

  const initializeApplication = useCallback(async () => {
    try {
      const cards = await getCollection<TCard>(FIREBASE_PATHS.CARDS);
      cards && setCards(cards);
    } catch (error) {
      console.error(error);
    }
  }, [getCollection]);

  return {
    initializeApplication,
    setShowNotification,
    setTimerTexts,
    cards,
    showNotification,
    timerTexts,
  };
};
