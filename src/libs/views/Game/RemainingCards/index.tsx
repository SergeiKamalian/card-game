import { memo, useMemo } from "react";
import { TGame } from "../../../types";
import {
  StyledRemainingCard,
  StyledRemainingCards,
  StyledRemainingCardsWrapper,
} from "./styles";
import { Card, Image, Text } from "../../../ui";
import cardBack from "../../../assets/images/cardBack.png";
import { giveRemainingAndBitoCardsCount } from "../../../utils";

interface RemainingCardsProps {
  game: TGame;
}

export const RemainingCards = memo((props: RemainingCardsProps) => {
  const { game } = props;

  const { remainingCards } = useMemo(
    () => giveRemainingAndBitoCardsCount(game),
    [game]
  );

  const showedCardsCount = useMemo(() => {
    if (remainingCards > 10) return 7;
    if (remainingCards > 3) return 3;
    if (remainingCards > 0) return 1;
    return 0;
  }, [remainingCards]);
  
  return (
    <StyledRemainingCards>
      <Text fz={30} fw={500}>{remainingCards}</Text>
      <Card card={game.trump} withActions={false} />
      <StyledRemainingCardsWrapper>
        {showedCardsCount
          ? new Array(showedCardsCount).fill(null).map((_, i) => (
              <StyledRemainingCard key={i} left={-1.5 * i}>
                <Image alt="card" height="100%" width="100%" url={cardBack} />
              </StyledRemainingCard>
            ))
          : null}
      </StyledRemainingCardsWrapper>
    </StyledRemainingCards>
  );
});
