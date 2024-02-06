import { useCallback, useContext } from "react"
import { useUser } from "./useUser"
import { TGame, TGameCreateRequest, TGameJoinRequest, TGamer } from "../types"
import { generateGameCode, getRandomCards, randomizeTrump, recognizeAttackerAndDefender } from "../utils"
import { useAppContext, useUserContext } from "../contexts"
import { useFirebase } from "./useFirebase"
import { APP_ROUTES, FIREBASE_PATHS } from "../constants"
import { useNavigate } from "react-router"

export const useGameConnection = () => {

    const { user } = useUserContext()
    const { cards } = useAppContext()
    const { changeData, getData } = useFirebase()
    const navigate = useNavigate()

    const createGame = useCallback(async (creatingForm: TGameCreateRequest) => {
        try {
            if (!user || !cards) return;

            const gameCode = generateGameCode();
            const { trump: trumpCard } = randomizeTrump(cards);
            const { gamerCards, remainingCards } = getRandomCards(cards, [], trumpCard);

            const gamers = [{ cards: gamerCards, name: user.name, index: 0 }]

            const requestData: TGame = {
                ...creatingForm,
                code: gameCode,
                started: false,
                trump: trumpCard,
                remainingCards,
                gamers,
                attacker: null,
                defender: null
            }
            await changeData(FIREBASE_PATHS.GAMES, String(requestData.code), requestData)
            navigate(`${APP_ROUTES.GAME}/${requestData.code}`)
        } catch (error) {
            console.log(error)
        }
    }, [user, cards, changeData])

    const joinToGame = useCallback(async (joiningForm: TGameJoinRequest) => {
        try {
            if (!user) return;
            const foundGame = await getData<TGame>(FIREBASE_PATHS.GAMES, joiningForm.code);
            if (!foundGame) {
                alert(`game with ${joiningForm.code} is not found`)
                return;
            }
            const { gamerCards, remainingCards } = getRandomCards(foundGame.remainingCards, [], foundGame.trump);
            const updatedGamers = [...foundGame.gamers, { cards: gamerCards, name: user.name, index: foundGame.gamers.length }];
            const started = updatedGamers.length === foundGame.gamersCount;
            const { attacker, defender } = recognizeAttackerAndDefender(updatedGamers, foundGame.trump.trump)
            const requestData: TGame = {
                ...foundGame,
                gamers: updatedGamers,
                remainingCards,
                ...(started && { started, defender, attacker })
            };
            await changeData(FIREBASE_PATHS.GAMES, String(requestData.code), requestData)
            navigate(`${APP_ROUTES.GAME}/${requestData.code}`)
        } catch (error) {
            console.log(error)
        }
    }, [user])

    return {
        createGame,
        joinToGame
    }
}