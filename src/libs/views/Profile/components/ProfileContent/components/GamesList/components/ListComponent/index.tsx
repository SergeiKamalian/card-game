import { memo } from "react";
import { TGame } from "../../../../../../../../types";

import { StyledListComponent } from "./styles";
import { GamesListItem } from "./components";

interface ListComponentProps {
  games: TGame[];
}

export const ListComponent = memo((props: ListComponentProps) => {
  const { games } = props;
  return (
    <StyledListComponent>
      {games.map((game) => (
        <GamesListItem key={game.code} game={game} />
      ))}
    </StyledListComponent>
  );
});
