import { memo } from "react";
import { StyledProfileContentWrapper } from "./styles";
import { JoiningToGame } from "./components";

export const ProfileContent = memo(() => {
  return (
    <StyledProfileContentWrapper>
      <JoiningToGame />
    </StyledProfileContentWrapper>
  );
});
