import { memo, useEffect, useMemo } from "react";
import { GameProvider, useGameContext, useUserContext } from "../../contexts";
import { StyledGame } from "./styles";
import { Cards, Table } from "../../views";
import { TGamer } from "../../types";

const GameComponent = memo(() => {
    const { id, followToGame, game } = useGameContext()
    const { user } = useUserContext()

    useEffect(() => followToGame(), [followToGame]);

    const userGamer = useMemo(() => game?.gamers.find(i => i.name === user?.name), [game?.gamers, user?.name])
    const restGamers = useMemo(() => {
        const userIndex = game?.gamers.find(({ name }) => name === user?.name)?.index;

        if (typeof userIndex === 'undefined') return [];
        const [firstPart, secondPart] = game?.gamers.reduce((acc, obj) => {
            if (obj.index === userIndex) return acc;
            acc[obj.index < userIndex ? 0 : 1].push(obj);
            return acc;
        }, [[], []] as [TGamer[], TGamer[]]) as [TGamer[], TGamer[]];
        return [...secondPart, ...firstPart]
    }, [game?.gamers, user?.name])

    console.log(restGamers)

    if (!userGamer) return null;

    return (
        <StyledGame>
            <h1>defender: {game?.defender}</h1>
            <h1>attacker: {game?.attacker}</h1>
            <div style={{ display: 'flex', gap: 20 }}>
                {restGamers?.map(gamer => <Cards key={gamer.name} gamer={gamer} />)}
            </div>
            <Table />
            <Cards gamer={userGamer} isUserCards />
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