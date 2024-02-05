import { useCallback } from "react"
import { useFirebase } from "./useFirebase"
import { FIREBASE_PATHS } from "../constants"
import { TUser } from "../types"

export const useAuthorization = () => {

    const { getData } = useFirebase()

    const checkUserRegistrationStatus = useCallback(async (userName: string) => {
        try {
            const foundUser = await getData<TUser>(FIREBASE_PATHS.USERS, userName);
            return Boolean(foundUser)
        } catch (error) {
            console.log(error)
        }
    }, [getData]);

    const registerUser = useCallback(async () => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }, [])

    return {
        checkUserRegistrationStatus
    }
}