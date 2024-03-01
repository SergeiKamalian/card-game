import { memo, useCallback } from "react";
import { TGame } from "../../../../../../../../../../types";
import { useTheme } from "styled-components";
import { Button, Image, Text, Wrapper } from "../../../../../../../../../../ui";
import coins from "../../../../../../../../../../assets/images/coins.png";
import { PiGameControllerFill } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";
import { StyledGamesListItem, StyledRow } from "./styles";
import { useGameConnection } from "../../../../../../../../../../hooks/useGameConnection";

interface GamesListItemProps {
  game: TGame;
}

export const GamesListItem = memo((props: GamesListItemProps) => {
  const { game } = props;
  const theme = useTheme();
  const { joinToGame } = useGameConnection();

  const joinHandler = useCallback(() => joinToGame({ code: String(game.code) }), [game.code, joinToGame]);

  return (
    <StyledGamesListItem>
      <Wrapper
        alignItems="center"
        minHeight="100%"
        padding="5px 25px"
        minWidth="90%"
      >
        <StyledRow minWidth="20%" gap="10px">
          <PiGameControllerFill color={theme.colors.white} size={20} />
          <Text fw={500} fz={17}>
            {game.code}
          </Text>
        </StyledRow>
        <StyledRow minWidth="20%" gap="10px">
          <Image alt="coins" height="30px" width="30px" url={coins} />
          <Text fw={400} fz={17}>
            {game.coins}
          </Text>
        </StyledRow>
        <StyledRow minWidth="20%" gap="10px">
          <MdPeopleAlt color={theme.colors.white} size={20} />
          <Wrapper padding="0">
            <Text fw={500} fz={17} color={theme.colors.link}>
              {game.gamers.length}
            </Text>
            <Text fw={500} fz={17}>
              / {game.gamersCount}
            </Text>
          </Wrapper>
        </StyledRow>
      </Wrapper>
      <Button isCircle circleSize={40} onClick={joinHandler}>
        <RiLoginCircleLine color={theme.colors.white} size={25} />
      </Button>
    </StyledGamesListItem>
  );
});
