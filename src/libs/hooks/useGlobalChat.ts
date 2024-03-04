import { useCallback, useEffect, useState } from "react";
import { TMessage, TMessageRequest } from "../types";

import { useUserContext } from "../contexts";
import { useFirebase } from "./useFirebase";
import { FIREBASE_PATHS } from "../constants";
import { collection, onSnapshot, query } from "firebase/firestore";
import { database } from "../configs";

export const useGlobalChat = () => {
  const { user } = useUserContext();
  const { changeData } = useFirebase();

  const [globalChatMessages, setGlobalChatMessages] = useState<TMessage[]>([]);

  const followToGlobalChatMessages = useCallback(() => {
    const q = query(collection(database, FIREBASE_PATHS.GLOBAL_CHAT));
    const unSub = onSnapshot(q, (snapshot) => {
      const messages: TMessage[] = [];
      snapshot.forEach((snap) => {
        messages.push(snap.data() as TMessage);
      });
      setGlobalChatMessages(messages);
    });
    return () => {
      unSub();
    };
  }, []);

  useEffect(followToGlobalChatMessages, [followToGlobalChatMessages]);

  const sendGlobalMessage = useCallback(
    async (values: TMessageRequest) => {
      try {
        if (!user) return;
        const writtenAt = new Date().toISOString();

        const messageItem: TMessage = {
          message: values.message,
          userAvatarUrl: user.avatarURL,
          userName: user.name,
          writtenAt,
        };
        await changeData(FIREBASE_PATHS.GLOBAL_CHAT, writtenAt, messageItem);
      } catch (error) {
        console.error(error);
      }
    },
    [changeData, user]
  );

  return { sendGlobalMessage, globalChatMessages };
};
