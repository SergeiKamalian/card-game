import { useCallback, useMemo, useEffect } from "react";
import { useUserContext } from "../contexts";
import { getDatabase, ref, set, onDisconnect } from "firebase/database";
import { FIREBASE_PATHS } from "../constants";
export const useConnection = () => {
  const { user } = useUserContext();

  const userRef = useMemo(() => {
    if (!user) return null;
    const db = getDatabase();
    return ref(db, `${FIREBASE_PATHS.CONNECTED_USERS}/${user.id}`);
  }, [user]);

  const connectUser = useCallback(() => {
    if (!userRef) return;
    set(userRef, {
      connected: true,
    });
  }, [userRef]);

  const disconnectUser = useCallback(() => {
    if (!userRef) return;
    const disconnectRef = onDisconnect(userRef);
    disconnectRef.remove()
  }, [userRef]);

  useEffect(() => {
    connectUser();
    disconnectUser();
  }, [connectUser, disconnectUser]);
};
