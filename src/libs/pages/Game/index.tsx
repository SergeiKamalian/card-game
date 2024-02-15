import { memo, useEffect } from "react";
import { GameProvider, TimerProvider, useGameContext, useTimerContext } from "../../contexts";
import { StyledGame } from "./styles";
import { Cards, Table } from "../../views";

const GameComponent = memo(() => {
    const { followToGame, game, userGamer, restGamers } = useGameContext();
    const { gameTimes, followTheGameTimes, followTheAttackerTime, followTheDefenderTime } = useTimerContext()

    useEffect(followToGame, [followToGame]);

    useEffect(followTheAttackerTime, [followTheAttackerTime]);

    useEffect(followTheDefenderTime, [followTheDefenderTime]);

    useEffect(followTheGameTimes, [followTheGameTimes])

    if (!userGamer) return null;

    return (
        <StyledGame>
            <h1>attacker: {game?.attacker}, max time: {`${gameTimes?.attackerFinishTime}`}</h1>
            <h1>defender: {game?.defender}, max time: {`${gameTimes?.defenderFinishTime}`}</h1>
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
            <TimerProvider>
                <GameComponent />
            </TimerProvider>
        </GameProvider>
    )
})