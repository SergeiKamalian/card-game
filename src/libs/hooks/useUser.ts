import { useCallback, useState } from "react"
import { TUser } from "../types"
import { APP_ROUTES } from "../constants";
import { useLocation, useNavigate, } from 'react-router-dom'

export const useUser = () => {

    const { pathname } = useLocation()

    const navigate = useNavigate()

    const [user, setUser] = useState<null | TUser>(null);
    const [userAuthStatus, setUserAuthStatus] = useState(false);

    const changeUser = useCallback((user: TUser | null) => {
        setUser(user);
        setUserAuthStatus(Boolean(user))
        if (pathname === APP_ROUTES.AUTHORIZATION) {
            navigate(APP_ROUTES.PROFILE)
        }
    }, [navigate, pathname])

    return {
        userAuthStatus,
        user,
        changeUser
    }
}