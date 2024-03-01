import { useCallback } from "react";
import { useFirebase } from "./useFirebase";
import {
  COOKIES_KEYS,
  FIREBASE_PATHS,
  USER_INITIAL_VALUES,
} from "../constants";
import { TUser, TUserForm, TUserRequest } from "../types";
import {
  generateSessionToken,
  generateToken,
  getCookie,
  parseToken,
  setCookie,
} from "../utils";
import { useAppLoadingContext, useUserContext } from "../contexts";

import { notification } from "../ui";

export const useAuthorization = () => {
  const { getData, changeData } = useFirebase();
  const { changeUser, userAuthStatus } = useUserContext();
  const { setAppLoading, setIsInitLoading } = useAppLoadingContext();

  const checkUserRegistrationStatus = useCallback(
    async (userName: string) => {
      try {
        const foundUser = await getData<TUser>(FIREBASE_PATHS.USERS, userName);
        return Boolean(foundUser);
      } catch (error) {
        console.error(error);
      }
    },
    [getData]
  );

  const authorizeUser = useCallback(
    async ({
      form,
      currentUser,
    }: {
      form?: TUserForm;
      currentUser?: TUser;
    }) => {
      try {
        setAppLoading(true);
        let foundUser = null;
        if (!currentUser && form) {
          foundUser = await getData<TUser>(FIREBASE_PATHS.USERS, form.name);
          if (!foundUser) {
            notification("User not found!", "error");
            return;
          }
          if (foundUser?.password !== form.password) {
            notification("Password is wrong!", "error");
            return;
          }
        } else {
          foundUser = currentUser;
        }
        if (!foundUser) return;
        const sessionToken = generateSessionToken();
        const token = generateToken(foundUser.name, 1, sessionToken);

        setCookie(COOKIES_KEYS.ACCESS_TOKEN, token);
        await changeData(FIREBASE_PATHS.AUTHORIZED_USERS, foundUser.name, {
          sessionToken,
        });
        changeUser(foundUser);
        notification("You have successfully logged in!", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [changeData, changeUser, getData, setAppLoading]
  );

  const registerUser = useCallback(
    async (form: TUserForm) => {
      try {
        setAppLoading(true);
        const userWithFormNameIsFound = await checkUserRegistrationStatus(
          form.name
        );
        if (userWithFormNameIsFound) {
          notification('A player with that name exists!', 'error')
          return;
        }

        const createdAt = new Date().toISOString();
        const requestForm: TUserRequest = {
          ...USER_INITIAL_VALUES,
          ...form,
          createdAt: createdAt,
        };
        await changeData(FIREBASE_PATHS.USERS, form.name, requestForm);
        await authorizeUser({ form });
        notification("You have successfully registered!", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [authorizeUser, changeData, checkUserRegistrationStatus, setAppLoading]
  );

  const checkUserAuthStatus = useCallback(async () => {
    try {
      if (userAuthStatus) return;
      const token = getCookie(COOKIES_KEYS.ACCESS_TOKEN);
      if (!token) {
        console.log("not found");
        return;
      }
      const [userName, authStatusFinishDateValue, sessionToken] =
        parseToken(token);

      const authStatusMaxDate = new Date(authStatusFinishDateValue);
      const currentTime = new Date();

      if (currentTime > authStatusMaxDate) {
        console.log("time is finish");
        return;
      }

      const foundAuthorizedUser = await getData<{ sessionToken: string }>(
        FIREBASE_PATHS.AUTHORIZED_USERS,
        userName
      );
      if (sessionToken !== foundAuthorizedUser?.sessionToken) {
        console.log("tokens is not equal");
        return;
      }
      const foundedUser = await getData<TUser>(FIREBASE_PATHS.USERS, userName);
      foundedUser && (await authorizeUser({ currentUser: foundedUser }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitLoading(false);
    }
  }, [authorizeUser, getData, setIsInitLoading, userAuthStatus]);

  return {
    registerUser,
    authorizeUser,
    checkUserAuthStatus,
  };
};
