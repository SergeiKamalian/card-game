import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { FormField } from "../../ui";
import {
  GAME_CREATING_INITIAL_VALUES,
  GAME_CREATING_SCHEMA,
  GAME_JOINING_INITIAL_VALUES,
  GAME_JOINING_SCHEMA,
} from "../../constants";
import { useGameConnection } from "../../hooks/useGameConnection";
import { useAppContext } from "../../contexts";
import { ProfileComponent } from "../../views";

export const Profile = memo(() => {
  const { initializeApplication } = useAppContext();

  useEffect(() => {
    initializeApplication();
  }, [initializeApplication]);

  return <ProfileComponent />;
});
