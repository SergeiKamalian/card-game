import { useCallback, useState } from "react"
import { clearInterval, setInterval } from "worker-timers";
import { useGameContext, useUserContext } from "../contexts";
import { TChangeGameTimes, TGameTimes } from "../types";
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

            // if (currentTime > attackerFinishTime) suspendAttacker()
            if (currentTime > attackerFinishTime) console.log()
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
        console.log(game)
        if (!game) return;
        console.log('mtav')
        const unSub = onSnapshot(doc(database, FIREBASE_PATHS.GAMES_TIMES, String(game.code)), (doc) => {
            const gameTimes = doc.data() as TGameTimes;
            console.log('ashxatec')
            console.log(gameTimes)
            setGameTimes(gameTimes)
        })
        return () => {
            unSub()
        }
    }, [game])

    const changeGameTimes = useCallback(async ({ attackerMinutes, defenderMinutes, gameId }: TChangeGameTimes) => {
        try {
            const attackerFinishTime = typeof attackerMinutes !== 'undefined'
                && (typeof attackerMinutes === 'number' ? calculateGamerStepTime(attackerMinutes) : null);

            const defenderFinishTime = typeof defenderMinutes !== 'undefined'
                && (typeof defenderMinutes === 'number' ? calculateGamerStepTime(defenderMinutes) : null);

            const newTimes = {
                ...(defenderFinishTime && { defenderFinishTime: String(defenderFinishTime) }),
                ...(attackerFinishTime && { attackerFinishTime: String(attackerFinishTime) }),
            }

            const data = gameTimes ? { ...gameTimes, ...newTimes } : newTimes
            
            await changeData(FIREBASE_PATHS.GAMES_TIMES, gameId, data)
        } catch (error) {
            console.error(error)
        }
    }, [changeData, gameTimes])

    return {
        gameTimes,
        followTheGameTimes,
        changeGameTimes,
        followTheAttackerTime,
        followTheDefenderTime,
    }

}