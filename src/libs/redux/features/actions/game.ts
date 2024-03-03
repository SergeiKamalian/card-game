import { TCard } from "../../../types";
import { GAME_TYPES } from "../types";

export const selectDefenderCard = (card: TCard) => ({
  type: GAME_TYPES.SELECT_DEFENDER_CARD,
  payload: card,
});

export const unselectDefenderCard = () => ({
  type: GAME_TYPES.SELECT_DEFENDER_CARD,
  payload: null,
});
