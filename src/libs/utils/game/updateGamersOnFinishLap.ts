import { GAMER_STATUSES } from "../../constants";
import { TCard, TGame, TGamer } from "../../types";
import { getRandomCards } from "../cards/getRandomCards";
import { sortCards } from "../cards/sortCards";

export const updateGamersOnFinishLap = (game: TGame) => {
  const gameNewGamers: TGamer[] = [];
  let gameRemainingCards = game.remainingCards;

  game.gamers.forEach((gamer) => {
    if (!gameRemainingCards.length) {
      gameNewGamers.push(gamer);
      return;
    }

    const isSurrenderedDefender =
      game.defenderSurrendered && game.defender === gamer.info.name;
    if (isSurrenderedDefender) {
      const inTableCards = (game.inTableCards as TCard[][]).reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      const defenderCards = sortCards(
        [...gamer.cards, ...inTableCards],
        game.trump.trump
      );
      gameNewGamers.push({ ...gamer, cards: defenderCards });
      return;
    }

    const gamerIsNotActive = gamer.status !== GAMER_STATUSES.ACTIVE;
    if (gamerIsNotActive) {
      gameNewGamers.push(gamer);
      return;
    }

    const { gamerCards, remainingCards } = getRandomCards(
      gameRemainingCards,
      gamer.cards,
      game.trump
    );
    gameNewGamers.push({ ...gamer, cards: gamerCards });
    gameRemainingCards = remainingCards;
  });

  return {
    remainingCards: gameRemainingCards,
    gamers: gameNewGamers,
  };
};
