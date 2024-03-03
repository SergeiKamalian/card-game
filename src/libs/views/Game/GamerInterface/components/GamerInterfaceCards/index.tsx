import { memo, useMemo } from "react";
import { StyledGamerInterfaceCards } from "./styles";
import { Card } from "../../../../../ui";
import { useGameContext } from "../../../../../contexts";
import { TGamer } from "../../../../../types";

interface GamerInterfaceCardsProps {
  gamer: TGamer;
}
const GAMER_INTERFACE_CARDS_MAX_WIDTH = 1000;

export const GamerInterfaceCards = memo((props: GamerInterfaceCardsProps) => {
  const { gamer } = props;
  const { defenderSelectedCard, handleSelectCard, handleUnselectCard } = useGameContext();

  const gamerCards = useMemo(() => [...gamer.cards], [gamer]);

  const viewedCardsWidth = useMemo(
    () => gamerCards.length * 70 + 70,
    [gamerCards]
  );

  const cardsLeftPixels = useMemo(() => {
    const containerWidth =
      viewedCardsWidth > GAMER_INTERFACE_CARDS_MAX_WIDTH
        ? GAMER_INTERFACE_CARDS_MAX_WIDTH
        : viewedCardsWidth;

    const totalCardWidth = gamerCards.length * 140;
    const availableSpace = containerWidth - totalCardWidth;
    const margin = availableSpace / (gamerCards.length - 1);
    return 140 + margin;
  }, [gamerCards.length, viewedCardsWidth]);

  return (
    <StyledGamerInterfaceCards width={viewedCardsWidth}>
      {gamerCards.map((card, index) => (
        <Card
          key={card.imageURL}
          card={card}
          left={index * cardsLeftPixels}
          selected={defenderSelectedCard?.imageURL === card.imageURL}
          isGamerCard
          handleSelectCard={handleSelectCard}
          handleUnselectCard={handleUnselectCard}
        />
      ))}
    </StyledGamerInterfaceCards>
  );
});
