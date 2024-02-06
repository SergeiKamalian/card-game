import { memo, useEffect } from "react";
import { GameProvider, useGameContext } from "../../contexts";

const GameComponent = memo(() => {
    const { id, followToGame, game } = useGameContext()

    useEffect(() => {
        followToGame()
    }, [followToGame])

    console.log(game)
    return (
        <div>game: {id}</div>
    )
})

export const Game = memo(() => {
    return (
        <GameProvider>
            <GameComponent />
        </GameProvider>
    )
})