import { memo, useMemo } from "react";
import { StyledJoiningToGame } from "./styles";
import { Tabs } from "../../../../../../ui";
import { CreateGame, JoinGame } from "./components";

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
      <Tabs tabs={tabs} />
    </StyledJoiningToGame>
  );
});
