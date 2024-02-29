import { memo, useState } from "react";
import { Authorization, Registration } from "../../views";

export const AuthorizationRoute = memo(() => {

  const [isRegistrationView, setIsRegistrationView] = useState(true);

  if (isRegistrationView) return <Registration setIsRegistrationView={setIsRegistrationView} />;

  return <Authorization setIsRegistrationView={setIsRegistrationView} />;
});
