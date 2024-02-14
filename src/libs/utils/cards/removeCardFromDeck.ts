import { TCard, TGame, TGamer } from "../../types";

export const removeCardFromDeck = (game: TGame, currentGamer: TGamer, removedCard: TCard) => {
    if (!game || !currentGamer) return;
    return game.gamers.map(gamer => {
        if (gamer.name === currentGamer.name) {
            return {
                ...gamer,
                cards: gamer.cards.filter(({ imageURL }) => imageURL !== removedCard.imageURL)
            }
        }
        return gamer
    })
}