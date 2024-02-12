import { TRUMPS } from "../constants";
import { TCard } from "../types";

export const checkDefenderCard = (selectedCard: TCard, inTableCard: TCard, gameTrump: TRUMPS) => {
    if (selectedCard.trump !== inTableCard.trump && selectedCard.trump !== gameTrump) {
        return false;
    };
    if (Number(selectedCard.value) < Number(inTableCard.value) && selectedCard.trump === inTableCard.trump) {
        return false;
    };
    return true;
}