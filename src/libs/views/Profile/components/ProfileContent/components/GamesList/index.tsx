import { memo } from "react";
import { StyledGamesList } from "./styles";
import { Text, Wrapper } from "../../../../../../ui";
import { ListComponent } from "./components";
import { useGames } from "../../../../../../hooks";
import { useTheme } from "styled-components";
import { PiGameControllerFill } from "react-icons/pi";


export const GamesList = memo(() => {
  const { games } = useGames();
  const theme = useTheme();

  return (
    <StyledGamesList>
      <Wrapper padding="0 0 0 7px" alignItems="center" gap={10}>
        <PiGameControllerFill color="white" size={30} />
        <Text fz={30} fw={500}>
          Games list
        </Text>
      </Wrapper>
      {!games.length ? (
        <Text color={theme.colors.purpleLight}>No active games</Text>
      ) : (
        <ListComponent games={games} />
      )}
    </StyledGamesList>
  );
});
