import { TCard } from "../../../types";
import { GAME_TYPES } from "../types";

interface TGameReducerState {
  defenderSelectedCard: TCard | null;
}
const INITIAL_STATE: TGameReducerState = {
  defenderSelectedCard: null,
};

export const gameReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: TCard | null }
) => {
  switch (action.type) {
    case GAME_TYPES.SELECT_DEFENDER_CARD || GAME_TYPES.UNSELECT_DEFENDER_CARD:
      return {
        ...state,
        defenderSelectedCard: action.payload,
      };
    default:
      return state;
  }
};

