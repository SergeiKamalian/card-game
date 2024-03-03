import { memo, useCallback, useRef } from "react";
import { StyledCard } from "./styles";
import { Image } from "../../atoms";
import { TCard } from "../../../types";

import { useOnClickOutside } from "../../functions";

interface CardProps {
  card: TCard;
  left?: number;
  isGamerCard?: boolean;
  selected?: boolean;
  withActions?: boolean;
  handleSelectCard?: (card: TCard) => void;
  handleUnselectCard?: () => void
}

export const Card = memo((props: CardProps) => {
  const {
    card,
    left,
    isGamerCard = false,
    selected = false,
    withActions = true,
    handleSelectCard,
    handleUnselectCard
  } = props;

  const cardRef = useRef(null);


  const selectHandler = useCallback(() => {
    if (!isGamerCard || !withActions || !handleSelectCard) return;
    handleSelectCard(card);
  }, [card, handleSelectCard, isGamerCard, withActions]);

  const unselectCard = useCallback(() => {
    if (!selected || !withActions || !handleUnselectCard) return;
    handleUnselectCard();
  }, [selected, withActions, handleUnselectCard]);

  useOnClickOutside({ ref: cardRef, handler: unselectCard, preventCLosedBasedElementDataName: 'in-table-cards' });

  return (
    <StyledCard
      left={left}
      onClick={selectHandler}
      selected={selected}
      withActions={withActions}
      ref={cardRef}
    >
      <Image
        alt={`${card.trump} ${card.value}`}
        url={card.imageURL}
        height="100%"
        width="136px"
      />
    </StyledCard>
  );
});
