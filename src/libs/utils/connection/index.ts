import { getDatabase, ref, onValue } from "firebase/database";
import { FIREBASE_PATHS } from "../../constants";

export const checkUserConnectionStatus = async (
  userId: number
): Promise<boolean> => {
  const db = getDatabase();
  const userRef = ref(db, `${FIREBASE_PATHS.CONNECTED_USERS}/${userId}`);

  try {
    return new Promise((resolve, reject) => {
      onValue(
        userRef,
        (snapshot) => {
          resolve(snapshot.exists());
        },
        (error) => {
          reject(error);
        }
      );
    });
  } catch (error) {
    console.error(error)
    return false;
  }
};
