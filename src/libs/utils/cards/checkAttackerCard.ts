import { TCard } from "../../types";

export const checkAttackerCard = (currentCard: TCard, inTableCards: TCard[][]) => {
    if (!inTableCards.length) return true;
    return inTableCards.some(cardGroup => cardGroup.find(card => card.value === currentCard.value))
}