import { TRUMPS } from "../constants";
import { TCard } from "../types";
import { sortCards } from "./sortCards";

export const getRandomCards = (remainingCards: TCard[], gamerCards: TCard[], trumpCard: TCard) => {
    const necessaryCardsCount = 6 - gamerCards.length;
    const remainingCardsWitoutTrump = remainingCards.filter(({ imageURL }) => imageURL !== trumpCard.imageURL)
    const randomizedCards = remainingCardsWitoutTrump.sort(() => Math.random() - 0.5);
    const gamerNewCards = sortCards(randomizedCards.slice(0, necessaryCardsCount), trumpCard.trump);
    const newRemainingCards = randomizedCards.slice(necessaryCardsCount);
    return {
        gamerCards: [...gamerCards, ...gamerNewCards],
        remainingCards: [...newRemainingCards, trumpCard]
    }
}