import { TRUMPS } from "../../constants";
import { TCard } from "../../types";

export const sortCards = (cards: TCard[], trump: TRUMPS) => {
    const sortedCards = [...cards]

    sortedCards.sort((a, b) => (a.trump.localeCompare(b.trump) || Number(a.value) - Number(b.value)));
    sortedCards.sort((a, b) => (a.trump === trump ? 1 : b.trump === trump ? -1 : 0));

    return sortedCards
}