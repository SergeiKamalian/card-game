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
import { Modal } from "../../ui";

const GameComponent = memo(() => {
  const {
    followToGame,
    game,
    userGamer,
    restGamers,
    // gameIsFinished,
    // followGamersStatuses,
  } = useGameContext();
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

  // useEffect(() => {
  //   followGamersStatuses();
  // }, [followGamersStatuses]);

  useEffect(() => {
    if (!game) return;
    // disconnectUserFromGame(game);
  }, [disconnectUserFromGame, game]);

  if (!game?.started) {
    return <Starting />;
  }

  console.log(game)

  if (!userGamer || !gameTimes || !game) {
    return null;
  }

  return (
    <>
      <StyledGame>
        <StyledGameTopBlock>
          <RemainingCards game={game} />
          <RestGamers
            game={game}
            restGamers={restGamers}
            gameTimes={gameTimes}
          />
          <BitoCards game={game} />
        </StyledGameTopBlock>
         <GameTable />
        <GamerInterface
          game={game}
          restGamers={restGamers}
          gameTimes={gameTimes}
        />
      </StyledGame>
      {/* <Modal
        isOpen={gameIsFinished}
        content={<span>finished</span>}
        title="Game is finished!"
      /> */}
    </>
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
