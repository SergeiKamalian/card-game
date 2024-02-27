import { memo, useEffect } from 'react';
import { Route, Routes as AppRoutes, BrowserRouter, Router } from 'react-router-dom';
import { APP_ROUTES } from '../constants';
import { AuthorizationRoute, Game, Profile } from '../pages';
import { useMount } from 'react-use';
import { useAuthorization, useUser } from '..';

export const Routes = memo(() => {

    const { checkUserAuthStatus } = useAuthorization();

    useEffect(() => {
        checkUserAuthStatus()
    }, [checkUserAuthStatus])

    return (
        <AppRoutes>
            <Route path={APP_ROUTES.AUTHORIZATION} element={<AuthorizationRoute />} />
            <Route path={APP_ROUTES.PROFILE} element={<Profile />} />
            <Route path={APP_ROUTES.GAME + '/:id'} element={<Game />} />
        </AppRoutes>
    );
});

Routes.displayName = 'Routes';