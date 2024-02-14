import { TCard } from "../../types";

export const randomizeTrump = (cards: TCard[]) => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const trump = cards[randomIndex];
    return {
        trump
    }
}