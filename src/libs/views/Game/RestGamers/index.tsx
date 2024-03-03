import { memo } from "react";
import { TGame, TGameTimes, TGamer } from "../../../types";
import { StyledRestGamers } from "./styles";
import { RestGamer } from "./components";

interface RestGamersProps {
  restGamers: TGamer[];
  gameTimes: TGameTimes;
  game: TGame;
}

export const RestGamers = memo((props: RestGamersProps) => {
  const { restGamers, gameTimes, game } = props;

  return (
    <StyledRestGamers>
      {restGamers.map((restGamer) => (
        <RestGamer
          game={game}
          gameTimes={gameTimes}
          restGamer={restGamer}
          key={restGamer.index}
        />
      ))}
    </StyledRestGamers>
  );
});
