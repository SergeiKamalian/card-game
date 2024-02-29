import { useCallback } from "react"
import { TGame, TGameCreateRequest, TGameJoinRequest } from "../types"
import { generateGameCode, getRandomCards, randomizeTrump, recognizeAttackerAndDefenderOnStart } from "../utils"
import { useAppContext, useTimerContext, useUserContext } from "../contexts"
import { useFirebase } from "./useFirebase"
import { APP_ROUTES, FIREBASE_PATHS, GAMERS_TIMES, GAMER_STATUSES } from "../constants"
import { useNavigate } from "react-router"
import { useTimer } from "./useTimer"

export const useGameConnection = () => {

    const { user } = useUserContext()
    const { cards } = useAppContext()
    const { changeData, getData } = useFirebase()
    const navigate = useNavigate()
    const { changeGameTimes } = useTimer()

    const createGame = useCallback(async (creatingForm: TGameCreateRequest) => {
        try {
            if (!user || !cards) return;

            const gameCode = generateGameCode();
            const { trump: trumpCard } = randomizeTrump(cards);
            const { gamerCards, remainingCards } = getRandomCards(cards, [], trumpCard);

            const gamers = [{ cards: gamerCards, name: user.name, index: 0, status: GAMER_STATUSES.ACTIVE }]

            const requestData: TGame = {
                ...creatingForm,
                private: creatingForm.private === 'true',
                code: gameCode,
                started: false,
                trump: trumpCard,
                remainingCards,
                gamers,
                attacker: null,
                defender: null,
                inTableCards: '[]',
                alreadyPlayedAttackersCount: 0,
                defenderSurrendered: false,
                gamersCount: Number(creatingForm.gamersCount)
            }

            await changeData(FIREBASE_PATHS.GAMES, String(requestData.code), requestData)
            navigate(`${APP_ROUTES.GAME}/${requestData.code}`)
        } catch (error) {
            console.error(error)
        }
    }, [user, cards, changeData, navigate])

    const joinToGame = useCallback(async (joiningForm: TGameJoinRequest) => {
        try {
            if (!user) return;

            const foundGame = await getData<TGame>(FIREBASE_PATHS.GAMES, joiningForm.code);

            if (!foundGame) {
                console.log(`game with ${joiningForm.code} is not found`)
                return;
            }

            if (foundGame.coins > user.coins) {
                console.log(`you don't have that many coins`)
                return;
            }

            if (Number(foundGame.gamersCount) === foundGame.gamers.length) {
                console.log(`game with ${joiningForm.code} is crowded with players`)
                return;
            }

            const { gamerCards, remainingCards } = getRandomCards(foundGame.remainingCards, [], foundGame.trump);
            const updatedGamers = [
                ...foundGame.gamers,
                { cards: gamerCards, name: user.name, index: foundGame.gamers.length, status: GAMER_STATUSES.ACTIVE }
            ];
            const started = updatedGamers.length === Number(foundGame.gamersCount);

            const { attacker, defender } = recognizeAttackerAndDefenderOnStart(updatedGamers, foundGame.trump.trump);

            const requestData: TGame = {
                ...foundGame,
                gamers: updatedGamers,
                remainingCards,
                ...(started && { started, defender, attacker })
            };

            await changeData(FIREBASE_PATHS.GAMES, String(requestData.code), requestData);
            if (started) {
                console.log('join')
                changeGameTimes({ attackerMinutes: GAMERS_TIMES.ATTACKER, gameId: joiningForm.code });
            }
            navigate(`${APP_ROUTES.GAME}/${requestData.code}`);
        } catch (error) {
            console.error(error)
        }
    }, [changeData, changeGameTimes, getData, navigate, user])

    return {
        createGame,
        joinToGame
    }
}