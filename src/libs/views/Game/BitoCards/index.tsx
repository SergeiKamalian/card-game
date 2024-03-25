import { memo, useMemo } from "react";
import { StyledBitoCard, StyledBitoCards } from "./styles";
import { TCard, TGame } from "../../../types";
import { Image } from "../../../ui";
import cardBack from "../../../assets/images/cardBack.png";

interface BitoCardsProps {
  game: TGame;
}

export const BitoCards = memo((props: BitoCardsProps) => {
  const { game } = props;

  const haveBitoCards = useMemo(() => {
    if (!game) return 0;
    const allGamersCardsCount = game.gamers?.reduce(
      (acc, obj) => acc + obj.cards.length,
      0
    );

    const inTableCardsCount = (game?.inTableCards as TCard[][])?.reduce(
      (acc, arr) => acc + arr.length,
      0
    );
    return (
      36 -
      game.remainingCards.length -
      allGamersCardsCount -
      (inTableCardsCount || 0)
    );
  }, [game]);

  return (
    <StyledBitoCards>
      {new Array(haveBitoCards).fill(null).map((_, i) => (
        <StyledBitoCard key={i} rotate={(i + 1) * 20}>
          <Image
            alt="card"
            height="170px"
            width="100%"
            url={cardBack}
            objectFit="contain"
          />
        </StyledBitoCard>
      ))}
    </StyledBitoCards>
  );
});
