import { useCallback, useState } from "react"
import { TUser } from "../types"
import { APP_ROUTES } from "../constants";
import { useNavigate } from 'react-router-dom'

export const useUser = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState<null | TUser>(null);
    const [userAuthStatus, setUserAuthStatus] = useState(false);

    const changeUser = useCallback((user: TUser | null) => {
        setUser(user);
        setUserAuthStatus(Boolean(user))
        navigate(APP_ROUTES.PROFILE)
    }, [navigate])

    return {
        userAuthStatus,
        user,
        changeUser
    }
}