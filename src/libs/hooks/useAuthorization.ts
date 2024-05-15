import { useCallback } from "react";
import { useFirebase } from "./useFirebase";
import {
  APP_ROUTES,
  COOKIES_KEYS,
  FIREBASE_PATHS,
  USER_INITIAL_VALUES,
} from "../constants";
import { TUser, TUserForm, TUserRequest } from "../types";
import {
  destroyCookie,
  generateSessionToken,
  generateToken,
  getCookie,
  parseToken,
  setCookie,
} from "../utils";
import { useAppLoadingContext, useUserContext } from "../contexts";

import { useNavigate } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../configs";
import { useNotification } from "../ui";

export const useAuthorization = () => {
  const { getData, changeData, deleteData, getCollection } = useFirebase();
  const { changeUser, userAuthStatus, user } = useUserContext();
  const { setAppLoading, setIsInitLoading } = useAppLoadingContext();
  const navigate = useNavigate();
  const notification = useNotification();

  const getUserByUserName = useCallback(async (name: string) => {
    try {
      const usersRef = collection(database, FIREBASE_PATHS.USERS);
      const q = query(usersRef, where("name", "==", name));
      const snapshot = await getDocs(q);
      // There can be 1 users with a unique name
      const users: TUser[] = [];
      snapshot.forEach((doc) => {
        const user = doc.data() as TUser;
        users.push(user);
      });
      return users[0];
    } catch (error) {
      console.error(error);
    }
  }, []);

  const checkUserRegistrationStatus = useCallback(
    async (userName: string) => {
      try {
        const foundUser = await getUserByUserName(userName);
        return Boolean(foundUser);
      } catch (error) {
        console.error(error);
      }
    },
    [getUserByUserName]
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
          foundUser = await getUserByUserName(form.name);
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
        const token = generateToken(String(foundUser.id), 1, sessionToken);

        setCookie(COOKIES_KEYS.ACCESS_TOKEN, token);
        await changeData(
          FIREBASE_PATHS.AUTHORIZED_USERS,
          String(foundUser.id),
          {
            sessionToken,
          }
        );
        changeUser(foundUser);
        notification("You have successfully logged in!", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [changeData, changeUser, getUserByUserName, setAppLoading]
  );

  const registerUser = useCallback(
    async (form: TUserForm) => {
      try {
        setAppLoading(true);
        const userWithFormNameIsFound = await checkUserRegistrationStatus(
          form.name
        );
        if (userWithFormNameIsFound) {
          notification("A player with that name exists!", "error");
          return;
        }
        const allUsers = await getCollection<TUser>(FIREBASE_PATHS.USERS);
        const newUserId = allUsers?.length || 0;
        const createdAt = new Date().toISOString();
        const requestForm: TUserRequest = {
          ...USER_INITIAL_VALUES,
          ...form,
          createdAt: createdAt,
          id: newUserId,
        };
        await changeData(FIREBASE_PATHS.USERS, String(newUserId), requestForm);
        await authorizeUser({ form });
        notification("You have successfully registered!", "success");
      } catch (error) {
        console.error(error);
      } finally {
        setAppLoading(false);
      }
    },
    [
      authorizeUser,
      changeData,
      checkUserRegistrationStatus,
      getCollection,
      setAppLoading,
    ]
  );

  const failedToAuthorizeUser = useCallback(() => {
    destroyCookie(COOKIES_KEYS.ACCESS_TOKEN);
    navigate(APP_ROUTES.AUTHORIZATION);
  }, [navigate]);

  const checkUserAuthStatus = useCallback(async () => {
    try {
      if (userAuthStatus) return;
      const token = getCookie(COOKIES_KEYS.ACCESS_TOKEN);
      if (!token) {
        failedToAuthorizeUser();
        return;
      }
      const [userId, authStatusFinishDateValue, sessionToken] =
        parseToken(token);

      const authStatusMaxDate = new Date(authStatusFinishDateValue);
      const currentTime = new Date();

      if (currentTime > authStatusMaxDate) {
        failedToAuthorizeUser();
        return;
      }

      const foundAuthorizedUser = await getData<{ sessionToken: string }>(
        FIREBASE_PATHS.AUTHORIZED_USERS,
        userId
      );
      if (sessionToken !== foundAuthorizedUser?.sessionToken) {
        failedToAuthorizeUser();
        return;
      }
      const foundedUser = await getData<TUser>(FIREBASE_PATHS.USERS, userId);
      foundedUser && (await authorizeUser({ currentUser: foundedUser }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitLoading(false);
    }
  }, [
    authorizeUser,
    failedToAuthorizeUser,
    getData,
    setIsInitLoading,
    userAuthStatus,
  ]);

  const logoutUser = useCallback(async () => {
    try {
      if (!user) return;
      setAppLoading(true);
      destroyCookie(COOKIES_KEYS.ACCESS_TOKEN);
      await deleteData(FIREBASE_PATHS.AUTHORIZED_USERS, String(user.id));
      changeUser(null);
      navigate(APP_ROUTES.AUTHORIZATION);
    } catch (error) {
    } finally {
      setAppLoading(false);
    }
  }, [changeUser, deleteData, navigate, setAppLoading, user]);

  return {
    registerUser,
    authorizeUser,
    checkUserAuthStatus,
    logoutUser,
    getUserByUserName,
  };
};
