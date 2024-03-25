import { GAMER_STATUSES } from "../../constants";
import { TGame } from "../../types";

export function recognizeAttackerOnTransferPlace(game: TGame) {

    const { gamers: players, defender, attacker } = game;

    const currentAttackerIndex = players.findIndex(({ info }) => info.name === attacker);

    let nextAttackerIndex = currentAttackerIndex + 1;

    if (nextAttackerIndex >= players.length) {
        nextAttackerIndex = 0;
    }

    let originalIndex = nextAttackerIndex;

    do {
        if (
            players[nextAttackerIndex].status === GAMER_STATUSES.ACTIVE &&
            players[nextAttackerIndex].info.name !== defender
        ) {
            break;
        }
        nextAttackerIndex++;
        if (nextAttackerIndex >= players.length) {
            nextAttackerIndex = 0;
        }
    } while (nextAttackerIndex !== originalIndex);

    const nextAttacker = players[nextAttackerIndex].info.name

    return nextAttacker;
}