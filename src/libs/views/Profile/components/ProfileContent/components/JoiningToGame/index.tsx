import { memo, useMemo } from "react";
import { StyledJoiningToGame } from "./styles";
import { Tabs, Text, Wrapper } from "../../../../../../ui";
import { CreateGame, JoinGame } from "./components";
import { GiCardPick } from "react-icons/gi";

export const JoiningToGame = memo(() => {
  const tabs = useMemo(
    () => [
      { id: 0, title: "Create a game", component: <CreateGame /> },
      { id: 1, title: "Join to game", component: <JoinGame /> },
    ],
    []
  );

  return (
    <StyledJoiningToGame>
      <Wrapper padding="0 0 0 7px" alignItems="center" gap={10}>
        <GiCardPick color="white" size={30} />
        <Text fz={30} fw={500}>
          Joining game
        </Text>
      </Wrapper>
      <Tabs tabs={tabs} />
    </StyledJoiningToGame>
  );
});
