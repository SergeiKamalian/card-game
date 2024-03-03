import { GAMER_STATUSES } from "../../constants";
import { TGame, TGamer } from "../../types";

// export const recognizeAttackerAndDefenderOnFinishLap = (game: TGame) => {
//     const gamers = game.gamers;
//     const prevDefenderIndex = gamers.find(({ name }) => name === game.defender)?.index || 0;

//     const newAttackerIndex = game.defenderSurrendered
//         ? ((prevDefenderIndex + 1) === Number(game.gamersCount) ? 0 : prevDefenderIndex + 1)
//         : prevDefenderIndex;

//     const attacker = game.gamers.find(({ index }) => index === newAttackerIndex)?.name;

//     const defender = game.gamers.find(({ index }) => {
//         const possibleNewDefenderIndex = newAttackerIndex + 1;
//         const newDefenderIndex = possibleNewDefenderIndex === Number(game.gamersCount) ? 0 : possibleNewDefenderIndex;
//         return index === newDefenderIndex;
//     })?.name;

//     return { attacker, defender }
// }

export const recognizeAttackerAndDefenderOnFinishLap = (game: TGame) => {
    const gamers = game.gamers;

    const findActivePlayerIndex = (startIndex: number, gamers: TGamer[]): number => {
        let currentIndex = startIndex;
        while (true) {
            const player = gamers[currentIndex];
            if (player.status === GAMER_STATUSES.ACTIVE) {
                return currentIndex;
            }
            currentIndex = (currentIndex + 1) % gamers.length;
        }
    };

    const prevDefenderIndex = gamers.findIndex(({ info }) => info.name === game.defender);
    const newAttackerIndex = game.defenderSurrendered
        ? (prevDefenderIndex + 1) % gamers.length
        : prevDefenderIndex;

    const attackerIndex = findActivePlayerIndex(newAttackerIndex, gamers);
    const defenderIndex = findActivePlayerIndex((attackerIndex + 1) % gamers.length, gamers);

    const attacker = gamers[attackerIndex]?.info.name;
    const defender = gamers[defenderIndex]?.info.name;

    return { attacker, defender };
};