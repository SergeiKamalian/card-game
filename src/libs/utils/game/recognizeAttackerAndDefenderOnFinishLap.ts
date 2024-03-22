import { GAMER_STATUSES } from "../../constants";
import { TGame, TGamer } from "../../types";

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