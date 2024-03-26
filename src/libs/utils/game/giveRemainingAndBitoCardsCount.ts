import { TGame } from "../../types";

export const giveRemainingAndBitoCardsCount = (game: TGame) => {
  const totalCards = game.gamers.map((player) => player.cards?.length || 0);
  const totalCardsCount = totalCards.reduce((total, count) => total + count, 0);
  return {
    remainingCards: game.remainingCards?.length || 0,
    bitoCards: 36 - game.remainingCards?.length || 0 - totalCardsCount,
  };
};
