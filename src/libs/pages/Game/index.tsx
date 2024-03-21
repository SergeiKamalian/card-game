import { memo, useEffect } from "react";
import {
  GameProvider,
  TimerProvider,
  useGameContext,
  useTimerContext,
} from "../../contexts";
import { StyledGame, StyledGameTopBlock } from "./styles";
import {
  GameTable,
  GamerInterface,
  RestGamers,
  RemainingCards,
  BitoCards,
  Starting,
} from "../../views";
import { useGameConnection } from "../../hooks/useGameConnection";

const GameComponent = memo(() => {
  const { followToGame, game, userGamer, restGamers, followGamersStatuses } =
    useGameContext();
  const {
    gameTimes,
    followTheGameTimes,
    followTheAttackerTime,
    followTheDefenderTime,
  } = useTimerContext();

  const { disconnectUserFromGame } = useGameConnection();

  useEffect(followToGame, [followToGame]);

  useEffect(followTheAttackerTime, [followTheAttackerTime]);

  useEffect(followTheDefenderTime, [followTheDefenderTime]);

  useEffect(followTheGameTimes, [followTheGameTimes]);

  useEffect(() => {
    followGamersStatuses()
  }, [followGamersStatuses]);

  useEffect(() => {
    if (!game) return;
    disconnectUserFromGame(game);
  }, [disconnectUserFromGame, game]);

  if (!game?.started) {
    return <Starting />;
  }

  if (!userGamer || !gameTimes || !game) {
    console.log(userGamer);
    console.log(gameTimes);
    console.log(game);
    return <h1>Че то не так пошло</h1>;
  }

  return (
    <StyledGame>
      <StyledGameTopBlock>
        <RemainingCards game={game} />
        <RestGamers game={game} restGamers={restGamers} gameTimes={gameTimes} />
        <BitoCards />
      </StyledGameTopBlock>
      <GameTable />
      <GamerInterface
        game={game}
        restGamers={restGamers}
        gameTimes={gameTimes}
      />
    </StyledGame>
  );
});

export const Game = memo(() => {
  return (
    <GameProvider>
      <TimerProvider>
        <GameComponent />
      </TimerProvider>
    </GameProvider>
  );
});
