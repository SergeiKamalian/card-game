import { TCard, TGame, TGamer } from "../../types";
import { getRandomCards } from "../cards/getRandomCards";
import { sortCards } from "../cards/sortCards";

export const updateGamersOnFinishLap = (game: TGame) => {
    const gameNewGamers: TGamer[] = [];
    let gameRemainingCards = game.remainingCards;

    game.gamers.forEach(gamer => {
        if (!gameRemainingCards.length) return;
        if (game.defenderSurrendered && game.defender === gamer.name) {
            const inTableCards = (game.inTableCards as TCard[][]).reduce((acc, curr) => acc.concat(curr), []);
            const defenderCards = sortCards([...gamer.cards, ...inTableCards], game.trump.trump);
            gameNewGamers.push({ ...gamer, cards: defenderCards });
            return;
        }

        const { gamerCards, remainingCards } = getRandomCards(gameRemainingCards, gamer.cards, game.trump);
        gameNewGamers.push({ ...gamer, cards: gamerCards });
        gameRemainingCards = remainingCards;
    })

    return {
        remainingCards: gameRemainingCards,
        gamers: gameNewGamers
    }
}