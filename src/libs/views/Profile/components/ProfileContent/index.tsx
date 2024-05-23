import { memo } from "react";
import { StyledColumn, StyledProfileContentWrapper } from "./styles";
import { GamesList, JoiningToGame, Slots } from "./components";

export const ProfileContent = memo(() => {
  return (
    <StyledProfileContentWrapper>
      <JoiningToGame />
      <GamesList />
      <StyledColumn>
        <Slots />
      </StyledColumn>
    </StyledProfileContentWrapper>
  );
});
