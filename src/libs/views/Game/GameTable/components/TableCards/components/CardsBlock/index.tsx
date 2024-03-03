import { memo, useMemo } from "react";
import {
  StyledAttackerCard,
  StyledCardsBlock,
  StyledDefenderCard,
} from "./styles";
import { Image } from "../../../../../../../ui";
import { TCard } from "../../../../../../../types";
import { useGameContext } from "../../../../../../../contexts";

interface CardsBlockProps {
  cardsBlock: TCard[];
  index: number;
}

export const CardsBlock = memo((props: CardsBlockProps) => {
  const { cardsBlock, index } = props;

  const attackerCard = useMemo(() => cardsBlock[0], [cardsBlock]);
  const defenderCard = useMemo(() => cardsBlock[1], [cardsBlock]);

  const { closeAttackCardHandler, defenderSelectedCard } = useGameContext();

  return (
    <StyledCardsBlock>
      {attackerCard ? (
        <StyledAttackerCard
          isFinish={Boolean(defenderCard)}
          onClick={() => closeAttackCardHandler(cardsBlock, index)}
        >
          <Image
            alt="card"
            height="100%"
            width="100%"
            url={attackerCard?.imageURL}
          />
        </StyledAttackerCard>
      ) : null}

      {defenderCard ? (
        <StyledDefenderCard>
          <Image
            alt="card"
            height="100%"
            width="100%"
            url={defenderCard?.imageURL}
          />
        </StyledDefenderCard>
      ) : null}
    </StyledCardsBlock>
  );
});
