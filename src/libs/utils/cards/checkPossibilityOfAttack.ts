import { TCard } from "../../types";

export const checkPossibilityOfAttack = (
  inTableCards: TCard[][],
  defenderCards: TCard[]
) => {
  const pendingCardsLength = inTableCards?.filter(
    ({ length }) => length === 1
  ).length;
  return pendingCardsLength + 1 <= defenderCards.length;
};
