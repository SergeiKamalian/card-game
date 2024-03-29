import { TCard } from "../../types";

export const checkPossibilityOfAttack = (
  inTableCards: TCard[][],
  defenderCards: TCard[]
) => {
  if (!inTableCards?.length) return true;
  const pendingCardsLength = inTableCards?.filter(
    ({ length }) => length === 1
  ).length;
  return pendingCardsLength + 1 <= defenderCards.length;
};
