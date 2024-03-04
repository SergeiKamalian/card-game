import { memo } from "react";
import { useGameContext } from "../../../contexts";
import { StyledGameTable } from "./styles";
import { TableCards } from "./components";

export const GameTable = memo(() => {
  const { game, closeAttackCardHandler } = useGameContext();

  if (!game) return null;
  
  return (
    <StyledGameTable>
      <button onClick={() => closeAttackCardHandler([], 0)}></button>
      <TableCards game={game} closeAttackCardHandler={closeAttackCardHandler} />
    </StyledGameTable>
  );
});
