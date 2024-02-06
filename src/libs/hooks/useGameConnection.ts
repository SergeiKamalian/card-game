import { useCallback } from "react"
import { useUser } from "./useUser"
import { TGame, TGameCreateRequest, TGamer } from "../types"
import { generateGameCode, getRandomCards } from "../utils"

export const useGameConnection = () => {

    const { user } = useUser()

    const createGame = useCallback(async (creatingForm: TGameCreateRequest) => {
        try {
            if (!user) return;
            const gameCode = generateGameCode();
            const gamers: TGamer[] = [{ name: user.name, cards: [] }];

            // const x = getRandomCards()
            
            // const request: TGame = {
            //     ...creatingForm,
            //     code: gameCode,
            //     started: false,
            //     gamers,
            // }
        } catch (error) {
            console.log(error)
        }
    }, [user])

    return {
        createGame
    }
}