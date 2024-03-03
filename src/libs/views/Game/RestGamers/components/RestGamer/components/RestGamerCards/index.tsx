import { memo, useMemo } from "react";
import {
  StyledRestGamerCard,
  StyledRestGamerCards,
  StyledRestGamerCardsWrapper,
} from "./styles";
import backCard from "../../../../../../../assets/images/cardBack.png";

interface RestGamerCardsProps {
  cardsCount: number;
}

const WRAPPER_MAX_WIDTH = 128;

export const RestGamerCards = memo((props: RestGamerCardsProps) => {
  const { cardsCount } = props;
  
  const viewedCardsWidth = useMemo(() => cardsCount * 15 + 15, [cardsCount]);

  const cardsLeftPixels = useMemo(() => {
    const containerWidth =
      viewedCardsWidth > WRAPPER_MAX_WIDTH
        ? WRAPPER_MAX_WIDTH
        : viewedCardsWidth;

    const totalCardWidth = cardsCount * 30;
    const availableSpace = containerWidth - totalCardWidth;
    const margin = availableSpace / (cardsCount - 1);
    return 30 + margin
  }, [cardsCount, viewedCardsWidth]);

  return (
    <StyledRestGamerCardsWrapper>
      <StyledRestGamerCards width={viewedCardsWidth}>
        {new Array(cardsCount).fill(null).map((_, index) => (
          <StyledRestGamerCard
            left={index * cardsLeftPixels}
            key={index}
            alt="card"
            src={backCard}
          />
        ))}
      </StyledRestGamerCards>
    </StyledRestGamerCardsWrapper>
  );
});
