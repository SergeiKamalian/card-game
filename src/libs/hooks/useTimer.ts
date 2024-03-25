import { useCallback, useState } from "react"
import { clearInterval, setInterval } from "worker-timers";
import { useGameContext, useUserContext } from "../contexts";
import { TGetGameUpdatedTimes, TGameTimes } from "../types";
import { FIREBASE_PATHS } from "../constants";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../configs";
import { calculateGamerStepTime } from "../utils/timer";
import { useFirebase } from "./useFirebase";

export const useTimer = () => {

    const { user } = useUserContext()
    const { game, suspendAttacker } = useGameContext()
    const { changeData } = useFirebase()

    const [gameTimes, setGameTimes] = useState<TGameTimes | null>(null)

    const followTheAttackerTime = useCallback(() => {
        if (!game || game.attacker !== user?.name) return;
        const checkAttackerFinishTime = () => {

            if (!gameTimes?.attackerFinishTime) return;

            const attackerFinishTime = new Date(gameTimes.attackerFinishTime);
            const currentTime = new Date();

            if (currentTime > attackerFinishTime) suspendAttacker()
        };
        const id = setInterval(checkAttackerFinishTime, 5000);
        return () => clearInterval(id);
    }, [game, gameTimes, suspendAttacker, user?.name])

    const followTheDefenderTime = useCallback(() => {
        if (!game || game.defender !== user?.name) return;
        const checkDefenderFinishTime = () => {
            if (!gameTimes?.defenderFinishTime) return;

            const attackerFinishTime = new Date(gameTimes.defenderFinishTime);
            const currentTime = new Date();
            if (currentTime > attackerFinishTime) console.log('left!')
        }
        const id = setInterval(checkDefenderFinishTime, 5000);
        return () => clearInterval(id);
    }, [game, gameTimes, user?.name])

    const followTheGameTimes = useCallback(() => {
        if (!game) return;
        const gameTimes = game.gamersTimes;
        setGameTimes(gameTimes)
    }, [game])

    const getGameUpdatedTimes = useCallback(async ({ attackerMinutes, defenderMinutes, gameId }: TGetGameUpdatedTimes) => {
        try {
            const attackerFinishTime = typeof attackerMinutes !== 'undefined'
                && (typeof attackerMinutes === 'number' ? calculateGamerStepTime(attackerMinutes) : null);

            const defenderFinishTime = typeof defenderMinutes !== 'undefined'
                && (typeof defenderMinutes === 'number' ? calculateGamerStepTime(defenderMinutes) : null);

            const newTimes = {
                defenderFinishTime: defenderFinishTime ? String(defenderFinishTime) : null,
                attackerFinishTime: attackerFinishTime ? String(attackerFinishTime) : null,
            }

            const data = gameTimes ? { ...gameTimes, ...newTimes } : newTimes

            return data;
        } catch (error) {
            console.error(error)
        }
    }, [gameTimes])

    return {
        gameTimes,
        followTheGameTimes,
        getGameUpdatedTimes,
        followTheAttackerTime,
        followTheDefenderTime,
    }

}