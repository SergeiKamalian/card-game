import { memo } from "react";
import { StyledProfileControl } from "./styles";
import { Logo, UserInfo } from "../../../../ui";
import { useUserContext } from "../../../../contexts";
import { ControlActions } from "./components";

export const ProfileControl = memo(() => {
  const { user } = useUserContext();
  if (!user) return null;
  return (
    <StyledProfileControl>
      <UserInfo user={user} />
      <Logo />
      <ControlActions />
    </StyledProfileControl>
  );
});
