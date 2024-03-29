import { memo, useMemo } from "react";
import { StyledCardWrapper, StyledGamerInterfaceCards } from "./styles";
import { Card } from "../../../../../ui";
import { useGameContext } from "../../../../../contexts";
import { TGamer } from "../../../../../types";

interface GamerInterfaceCardsProps {
  gamer: TGamer;
}
const GAMER_INTERFACE_CARDS_MAX_WIDTH = 1000;

export const GamerInterfaceCards = memo((props: GamerInterfaceCardsProps) => {
  const { gamer } = props;
  const { defenderSelectedCard, handleSelectCard, handleUnselectCard } =
    useGameContext();
  
  const gamerCards = useMemo(() => gamer.cards || [], [gamer]);

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

  const stylizePlayerCard = (total: number, index: number) => {
    const rotationRange = 15;
    const rotation = ((index - (total - 1) / 2) / (total - 2)) * rotationRange;
    const offsetRange = 30;
    const offset = Math.abs(
      ((index - (total - 1) / 2) / (total - 2)) * offsetRange
    );
    return `translateY(${offset}px) rotate(${rotation}deg)`;
  };

  return (
    <StyledGamerInterfaceCards width={viewedCardsWidth}>
      {gamerCards.map((card, index) => (
        <StyledCardWrapper
          transform={stylizePlayerCard(gamerCards.length || 0, index)}
          left={index * cardsLeftPixels}
        >
          <Card
            key={card.imageURL}
            card={card}
            selected={defenderSelectedCard?.imageURL === card.imageURL}
            isGamerCard
            handleSelectCard={handleSelectCard}
            handleUnselectCard={handleUnselectCard}
          />
        </StyledCardWrapper>
      ))}
    </StyledGamerInterfaceCards>
  );
});
