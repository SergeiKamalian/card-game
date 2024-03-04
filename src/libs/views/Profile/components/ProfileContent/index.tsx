import { memo } from "react";
import { StyledProfileContentWrapper } from "./styles";
import { GamesList, GeneralChat, JoiningToGame } from "./components";

export const ProfileContent = memo(() => {
  return (
    <StyledProfileContentWrapper>
      <JoiningToGame />
      <GamesList />
      <GeneralChat />
    </StyledProfileContentWrapper>
  );
});
