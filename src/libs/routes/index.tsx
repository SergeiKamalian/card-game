import { memo, useEffect } from "react";
import { Route, Routes as AppRoutes } from "react-router-dom";
import { APP_ROUTES } from "../constants";
import { AuthorizationRoute, Game, Profile } from "../pages";
import {
  InitLoading,
  useAppLoadingContext,
  useAuthorization,
  useConnection,
} from "..";

export const Routes = memo(() => {
  const { checkUserAuthStatus } = useAuthorization();
  const { isInitLoading } = useAppLoadingContext();

  useEffect(() => {
    checkUserAuthStatus();
  }, [checkUserAuthStatus]);

  useConnection();

  if (isInitLoading) return <InitLoading />;

  return (
    <AppRoutes>
      <Route path={APP_ROUTES.AUTHORIZATION} element={<AuthorizationRoute />} />
      <Route path={APP_ROUTES.PROFILE} element={<Profile />} />
      <Route path={APP_ROUTES.GAME + "/:id"} element={<Game />} />
    </AppRoutes>
  );
});

Routes.displayName = "Routes";
