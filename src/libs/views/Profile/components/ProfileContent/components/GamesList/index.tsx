import { memo } from "react";
import { StyledGamesList } from "./styles";
import { Modal, Text, Wrapper } from "../../../../../../ui";
import { GameRequestContent, ListComponent } from "./components";
import { useGames } from "../../../../../../hooks";
import { useTheme } from "styled-components";
import { PiGameControllerFill } from "react-icons/pi";

export const GamesList = memo(() => {
  const { games, activeGameRequest, setActiveGameRequest } = useGames();
  const theme = useTheme();

  return (
    <>
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
      <Modal
        content={<GameRequestContent gameRequest={activeGameRequest} />}
        isOpen={Boolean(activeGameRequest)}
        onClose={() => setActiveGameRequest(null)}
        title="Game request"
      />
    </>
  );
});
