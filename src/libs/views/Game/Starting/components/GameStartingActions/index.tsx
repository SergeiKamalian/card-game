import { memo } from "react";
import { TGame } from "../../../../../types";
import { StyledLeftGameButton } from "./styles";

interface GameStartingActionsProps {
  game: TGame;
}

export const GameStartingActions = memo((props: GameStartingActionsProps) => {
  const { game } = props;

  return <StyledLeftGameButton>Leave game</StyledLeftGameButton>;
});
