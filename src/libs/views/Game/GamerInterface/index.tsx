import { memo, useMemo } from "react";
import {
  StyledGamerInterface,
  StyledGamerInterfaceContent,
} from "./styles";
import { TGame, TGameTimes, TGamer } from "../../../types";
import { useUserContext } from "../../../contexts";
import { RestGamer } from "../RestGamers/components";
import { GamerInterfaceActions, GamerInterfaceCards } from "./components";

interface GamerInterfaceProps {
  restGamers: TGamer[];
  gameTimes: TGameTimes;
  game: TGame;
}

export const GamerInterface = memo((props: GamerInterfaceProps) => {
  const { game, gameTimes } = props;
  const { user } = useUserContext();
  const userGamer = useMemo(
    () => game.gamers.find((gamer) => gamer.info.name === user?.name),
    [game, user]
  );
  
  if (!userGamer) return null;
  return (
    <StyledGamerInterface>
      <RestGamer
        game={game}
        gameTimes={gameTimes}
        restGamer={userGamer}
        isUser
      />
      <StyledGamerInterfaceContent>
        <GamerInterfaceCards gamer={userGamer} />
      </StyledGamerInterfaceContent>

      <GamerInterfaceActions game={game} />
    </StyledGamerInterface>
  );
});
