import { memo } from "react";
import { StyledProfileContentWrapper } from "./styles";
import { GamesList, JoiningToGame } from "./components";

export const ProfileContent = memo(() => {
  return (
    <StyledProfileContentWrapper>
      <JoiningToGame />
      <GamesList />
      <div></div>
      {/* <JoiningToGame /> */}
    </StyledProfileContentWrapper>
  );
});
