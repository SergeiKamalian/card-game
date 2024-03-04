import { memo, useMemo } from "react";
import { TCard, TGame } from "../../../../../types";
import { StyledGamerInterfaceActions } from "./styles";
import { useGameContext, useUserContext } from "../../../../../contexts";
import { GamerAction } from "./components";

interface GameInterfaceActionsProps {
  game: TGame;
}

export const GamerInterfaceActions = memo(
  (props: GameInterfaceActionsProps) => {
    const { game } = props;

    const { finishUserTurnHandler, takeInTableCards } = useGameContext();

    const { user } = useUserContext();

    const showTakeInTableCardsButton = useMemo(
      () =>
        game?.defender === user?.name &&
        !game?.defenderSurrendered &&
        (game?.inTableCards as TCard[][]).some(
          (cardGroup) => cardGroup.length === 1
        ),
      [game, user]
    );

    const showCompletingTheLapButton = useMemo(() => {
      const isAttackerCards = game?.attacker === user?.name;
      if (!isAttackerCards) return false;

      const onTableAllCardsIsClosed = (game?.inTableCards as TCard[][]).every(
        (cardGroup) => cardGroup.length === 2
      );
      const tableIsNotEmpty = game?.inTableCards.length;

      if (
        (onTableAllCardsIsClosed && tableIsNotEmpty) ||
        game?.defenderSurrendered
      )
        return true;

      return false;
    }, [game, user]);

    if (!game || !user) return null;

    return (
      <StyledGamerInterfaceActions>
        {showCompletingTheLapButton ? (
          <GamerAction type="complete" onClick={finishUserTurnHandler} />
        ) : null}
        {showTakeInTableCardsButton ? (
          <GamerAction type="take" onClick={takeInTableCards} />
        ) : null}
      </StyledGamerInterfaceActions>
    );
  }
);
