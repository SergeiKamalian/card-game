import { Form, Formik } from "formik";
import { memo, useState } from "react";
import {
  REGISTRATION_INITIAL_VALUES,
  REGISTRATION_SCHEMA,
} from "../../constants";
import { FormField } from "../../ui";
import { useNavigate } from "react-router";
import { useAuthorization } from "../../hooks";
import { useUserContext } from "../../contexts";
import { Authorization, Registration } from "../../views";

export const AuthorizationRoute = memo(() => {

  const { userAuthStatus } = useUserContext();

  const [isRegistrationView, setIsRegistrationView] = useState(true);

  if (isRegistrationView) return <Registration setIsRegistrationView={setIsRegistrationView} />;

  return <Authorization setIsRegistrationView={setIsRegistrationView} />;
});
