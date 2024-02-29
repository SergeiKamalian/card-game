import { memo } from "react";
import { StyledProfileComponent } from "./styles";
import { ProfileContent, ProfileControl, Trackers } from "./components";

export const ProfileComponent = memo(() => {
  return (
    <StyledProfileComponent className="fullscreenBlock">
      <Trackers />
      <ProfileContent />
      <ProfileControl />
    </StyledProfileComponent>
  );
});
