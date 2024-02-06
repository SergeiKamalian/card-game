import { useCallback, useState } from "react";
import { useParams } from "react-router"
import { TGame } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS } from "../constants";

export const useGame = () => {

    const { id } = useParams();

    const [game, setGame] = useState<TGame | null>(null);

    const followToGame = useCallback(() => {
        if (!id) return;
        const unSub = onSnapshot(doc(database, FIREBASE_PATHS.GAMES, id), (doc) => {
            const game = doc.data() as TGame;
            setGame(game)
        })

        return () => {
            unSub()
        }
    }, [id])


    return {
        id,
        followToGame,
        game
    }
}