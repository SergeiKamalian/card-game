import { memo, useState } from "react";
import { useGameContext } from "../../../contexts";
import {
  GameStartingActions,
  GameStartingFriendsModal,
  GameStartingInformation,
  GameStartingRestGamers,
} from "./components";
import { Wrapper } from "../../../ui";

export const Starting = memo(() => {
  const { game } = useGameContext();

  const [friendsModalIsOpen, setFriendsModalIsOpen] = useState(false);

  if (!game) return null;

  return (
    <>
      <Wrapper direction="column" gap={50} alignItems="center">
        <GameStartingInformation game={game} />
        <GameStartingRestGamers
          game={game}
          setFriendsModalIsOpen={setFriendsModalIsOpen}
        />
        <GameStartingActions game={game} />
      </Wrapper>
      <GameStartingFriendsModal setFriendsModalIsOpen={setFriendsModalIsOpen} isOpen={friendsModalIsOpen} />
    </>
  );
});
