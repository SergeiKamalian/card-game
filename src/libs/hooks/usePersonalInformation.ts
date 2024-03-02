import { useCallback, useMemo } from "react";
import { useAppLoadingContext, useUserContext } from "../contexts";
import { TPersonalInformationRequest, TUser } from "../types";
import { useFirebase } from "./useFirebase";
import { FIREBASE_PATHS } from "../constants";

export const usePersonalInformation = () => {
  const { user, changeUser } = useUserContext();
  const { setAppLoading } = useAppLoadingContext();
  const { changeData, getData } = useFirebase();

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
        await changeData(FIREBASE_PATHS.USERS, user.name, {
          ...user,
          ...values,
        });
        const newUser = await getData<TUser>(FIREBASE_PATHS.USERS, values.name);
        newUser && changeUser(newUser)
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [changeData, changeUser, getData, setAppLoading, user]
  );

  return { editPersonalInformation, initialValues };
};
