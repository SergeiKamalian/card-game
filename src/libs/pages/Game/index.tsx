import { memo, useEffect, useMemo } from "react";
import { GameProvider, useGameContext, useUserContext } from "../../contexts";
import { StyledGame } from "./styles";
import { Cards, Table } from "../../views";

const GameComponent = memo(() => {
    const { id, followToGame, game } = useGameContext()
    const { user } = useUserContext()
    
    useEffect(() => followToGame(), [followToGame]);

    const userGamer = useMemo(() => game?.gamers.find(i => i.name === user?.name), [game?.gamers, user?.name])
    const restGamers = useMemo(() => game?.gamers.filter(i => i.name !== user?.name), [game?.gamers, user?.name])

    if (!userGamer) return null;

    return (
        <StyledGame>
            <div>
                {restGamers?.map(i => <Cards key={i.name} cards={i.cards} />)}
            </div>
            <Table />
            <Cards cards={userGamer.cards} isUserCards />
        </StyledGame>
    )
})

export const Game = memo(() => {
    return (
        <GameProvider>
            <GameComponent />
        </GameProvider>
    )
})