import { memo, useMemo } from "react";
import { TGame } from "../../../../../types";
import { useUserContext } from "../../../../../contexts";
import { Wrapper } from "../../../../../ui";
import { RestGamer } from "../../../RestGamers/components";


interface GameStartingRestGamersProps {
  game: TGame;
  setFriendsModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GameStartingRestGamers = memo(
  (props: GameStartingRestGamersProps) => {
    const { game, setFriendsModalIsOpen } = props;
    const { user } = useUserContext();

    return (
      <Wrapper gap={20}>
        {game.gamers.map((restGamer) => (
          <RestGamer
            game={game}
            gameTimes={null}
            restGamer={restGamer}
            key={restGamer.index}
            isStartingView
          />
        ))}
        {new Array(game.gamersCount - game.gamers.length)
          .fill(null)
          .map((_, index) => (
            <RestGamer
              game={game}
              gameTimes={null}
              restGamer={null}
              key={index}
              isStartingView
              onInvite={() => setFriendsModalIsOpen(true)}
            />
          ))}
      </Wrapper>
    );
  }
);
