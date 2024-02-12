import { useCallback } from "react"
import { useFirebase } from "./useFirebase"
import { COOKIES_KEYS, FIREBASE_PATHS, USER_INITIAL_VALUES } from "../constants"
import { TUser, TUserForm, TUserRequest } from "../types"
import { generateSessionToken, generateToken, getCookie, parseToken, setCookie } from "../utils"
import { useUserContext } from "../contexts"

export const useAuthorization = () => {

    const { getData, changeData } = useFirebase()
    const { changeUser, userAuthStatus } = useUserContext()

    const checkUserRegistrationStatus = useCallback(async (userName: string) => {
        try {
            const foundUser = await getData<TUser>(FIREBASE_PATHS.USERS, userName);
            return Boolean(foundUser)
        } catch (error) {
            console.error(error)
        }
    }, [getData]);

    const authorizeUser = useCallback(async ({ form, currentUser }: { form?: TUserForm, currentUser?: TUser }) => {
        try {
            let foundUser = null;
            if (!currentUser && form) {
                foundUser = await getData<TUser>(FIREBASE_PATHS.USERS, form.name);
                if (foundUser?.password !== form.password) {
                    alert('password is wrong!');
                    return;
                }
            } else {
                foundUser = currentUser
            }
            if (!foundUser) return;
            const sessionToken = generateSessionToken()
            const token = generateToken(foundUser.name, 1, sessionToken);

            setCookie(COOKIES_KEYS.ACCESS_TOKEN, token);
            await changeData(FIREBASE_PATHS.AUTHORIZED_USERS, foundUser.name, { sessionToken });
            changeUser(foundUser);
        } catch (error) {
            console.error(error)
        }
    }, [changeData, changeUser, getData]);

    const registerUser = useCallback(async (form: TUserForm) => {
        try {
            const userWithFormNameIsFound = await checkUserRegistrationStatus(form.name);
            if (userWithFormNameIsFound) {
                alert('user is found');
                return;
            }

            const createdAt = new Date().toISOString();
            const requestForm: TUserRequest = {
                ...USER_INITIAL_VALUES,
                ...form,
                createdAt: createdAt
            };
            await changeData(FIREBASE_PATHS.USERS, form.name, requestForm)
            await authorizeUser({ form })
        } catch (error) {
            console.error(error)
        }
    }, [authorizeUser, changeData, checkUserRegistrationStatus]);

    const checkUserAuthStatus = useCallback(async () => {
        if (userAuthStatus) return;
        const token = getCookie(COOKIES_KEYS.ACCESS_TOKEN);
        if (!token) {
            alert('not found')
            return;
        }
        const [userName, authStatusFinishDateValue, sessionToken] = parseToken(token);

        const authStatusMaxDate = new Date(authStatusFinishDateValue);
        const currentTime = new Date();

        if (currentTime > authStatusMaxDate) {
            alert('time is finish')
            return;
        }

        const foundAuthorizedUser = await getData<{ sessionToken: string }>(FIREBASE_PATHS.AUTHORIZED_USERS, userName);
        if (sessionToken !== foundAuthorizedUser?.sessionToken) {
            alert('tokens is not equal')
            return;
        }
        const foundedUser = await getData<TUser>(FIREBASE_PATHS.USERS, userName);
        foundedUser && await authorizeUser({ currentUser: foundedUser })
    }, [authorizeUser, getData, userAuthStatus])

    return {
        registerUser,
        checkUserAuthStatus
    }
}