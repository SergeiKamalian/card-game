import { TCard } from "../../types";
import { sortCards } from "./sortCards";

export const getRandomCards = (
  remainingCards: TCard[],
  gamerCards: TCard[],
  trumpCard: TCard
) => {
  const necessaryCardsCount = 6 - gamerCards.length;
  if (necessaryCardsCount < 1)
    return {
      gamerCards,
      remainingCards,
    };

  const remainingCardsWithoutTrump = remainingCards.filter(
    ({ imageURL }) => imageURL !== trumpCard.imageURL
  );
  const activeRemainingCards =
    remainingCards.length > necessaryCardsCount
      ? remainingCardsWithoutTrump
      : remainingCards;
  if (!activeRemainingCards.length)
    return {
      gamerCards,
      remainingCards,
    };
  if (activeRemainingCards.length <= necessaryCardsCount) {
    const gamerNewCards = sortCards(
      [...gamerCards, ...remainingCards],
      trumpCard.trump
    );
    return {
      gamerCards: gamerNewCards,
      remainingCards: [],
    };
  }
  const randomizedCards = activeRemainingCards.sort(() => Math.random() - 0.5);
  const gamerNewCards = randomizedCards.slice(0, necessaryCardsCount);
  const gamerReadyCards = sortCards(
    [...gamerCards, ...gamerNewCards],
    trumpCard.trump
  );
  const newRemainingCards = randomizedCards.slice(necessaryCardsCount);
  return {
    gamerCards: gamerReadyCards,
    remainingCards: [...newRemainingCards, trumpCard],
  };
};
