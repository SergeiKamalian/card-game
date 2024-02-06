import { TCard } from "../types";

export const getRandomCards = (remainingCards: TCard[], gamerCards: TCard[]) => {
    const necessaryCardsCount = 6 - gamerCards.length;
    const randomizedCards = remainingCards.sort(() => Math.random() - 0.5);
    const gamerNewCards = randomizedCards.slice(0, necessaryCardsCount);
    const newRemainingCards = randomizedCards.slice(necessaryCardsCount);
    return {
        gamerCards: [...gamerCards, ...gamerNewCards],
        remainingCards: newRemainingCards
    }
}