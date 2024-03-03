import { memo, useMemo } from "react";
import { TCard, TGame } from "../../../../../types";
import { StyledTableCards } from "./styles";
import { CardsBlock } from "./components";

interface TableCardsProps {
  game: TGame;
  closeAttackCardHandler: (
    inTableCardGroup: TCard[],
    groupIndex: number
  ) => void;
}

export const TableCards = memo((props: TableCardsProps) => {
  const { game} = props;
  const inTableCards = useMemo(() => game.inTableCards as TCard[][], [game]);
  return (
    <StyledTableCards data-name='in-table-cards'>
      {inTableCards.map((cardBlock, index) => (
        <CardsBlock
          key={cardBlock[0].imageURL}
          cardsBlock={cardBlock}
          index={index}
        />
      ))}
      {/* {new Array(freePlaces).fill(null).map((_, i) => (
        <CardsBlock key={i} cardsBlock={[]} />
      ))} */}
    </StyledTableCards>
  );
});
