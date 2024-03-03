import { TGame } from "../../types";

export const giveRemainingAndBitoCardsCount = (game: TGame) => {
  const totalCards = game.gamers.map((player) => player.cards.length);
  const totalCardsCount = totalCards.reduce((total, count) => total + count, 0);
  return {
    remainingCards: game.remainingCards.length,
    bitoCards: 36 - game.remainingCards.length - totalCardsCount,
  };
};
