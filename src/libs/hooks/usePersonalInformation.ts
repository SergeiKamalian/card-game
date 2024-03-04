import { useCallback, useMemo } from "react";
import { useAppLoadingContext, useUserContext } from "../contexts";
import { TPersonalInformationRequest } from "../types";
import { useFirebase } from "./useFirebase";
import { FIREBASE_PATHS } from "../constants";
import { useAuthorization } from "./useAuthorization";
import { notification } from "../ui";

export const usePersonalInformation = () => {
  const { user, changeUser } = useUserContext();
  const { setAppLoading } = useAppLoadingContext();
  const { changeData } = useFirebase();
  const { getUserByUserName } = useAuthorization();

  const initialValues: TPersonalInformationRequest | null = useMemo(() => {
    if (!user) return null;
    return {
      name: user.name,
      password: user.password,
      avatarURL: user.avatarURL,
    };
  }, [user]);

  const editPersonalInformation = useCallback(
    async (values: TPersonalInformationRequest) => {
      try {
        if (!user) return;
        setAppLoading(true);
        await changeData(FIREBASE_PATHS.USERS, String(user.id), {
          ...user,
          ...values,
        });
        const newUser = await getUserByUserName(values.name);
        newUser && changeUser(newUser);
        notification("User information successfully updated!", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [changeData, changeUser, getUserByUserName, setAppLoading, user]
  );

  return { editPersonalInformation, initialValues };
};
