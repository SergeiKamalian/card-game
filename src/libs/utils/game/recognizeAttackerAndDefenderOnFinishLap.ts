import { TGame } from "../../types";

export const recognizeAttackerAndDefenderOnFinishLap = (game: TGame) => {
    const gamers = game.gamers;
    const prevDefenderIndex = gamers.find(({ name }) => name === game.defender)?.index || 0;

    const newAttackerIndex = game.defenderSurrendered
        ? ((prevDefenderIndex + 1) === Number(game.gamersCount) ? 0 : prevDefenderIndex + 1)
        : prevDefenderIndex;

    const attacker = game.gamers.find(({ index }) => index === newAttackerIndex)?.name;

    const defender = game.gamers.find(({ index }) => {
        const possibleNewDefenderIndex = newAttackerIndex + 1;
        const newDefenderIndex = possibleNewDefenderIndex === Number(game.gamersCount) ? 0 : possibleNewDefenderIndex;
        return index === newDefenderIndex;
    })?.name;

    return { attacker, defender }
}