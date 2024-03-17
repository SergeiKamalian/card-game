import { memo, useEffect, useState } from "react";
import { TGameRequest } from "../../../../../../../../types";
import {
  StyledCenterBlock,
  StyledGameRequestContent,
  StyledRow,
} from "./styles";
import { Button, Text, UserInfo } from "../../../../../../../../ui";
import { clearInterval, setInterval } from "worker-timers";
import { useFriendsContext } from "../../../../../../../../contexts/Friends";

interface GameRequestContentProps {
  gameRequest: TGameRequest | null;
}

export const GameRequestContent = memo((props: GameRequestContentProps) => {
  const { gameRequest } = props;

  const [remainingSeconds, setRemainingSeconds] = useState(60);

  const { rejectGameRequest, acceptGameRequest } = useFriendsContext();

  useEffect(() => {
    if (!gameRequest?.finishedAt) return;
    const id = setInterval(() => {
      const targetDate = new Date(gameRequest.finishedAt);
      const currentDate = new Date();
      const differenceMs = targetDate.getTime() - currentDate.getTime();
      const remainingSeconds = Math.floor(differenceMs / 1000);
      if (remainingSeconds < 1) {
        rejectGameRequest();
        return;
      }
      setRemainingSeconds(remainingSeconds);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [gameRequest?.finishedAt, rejectGameRequest]);

  if (!gameRequest) return null;

  return (
    <StyledGameRequestContent>
      <StyledCenterBlock>
        <Text fz={40} fw={600}>
          {remainingSeconds}
        </Text>
      </StyledCenterBlock>
      <Text fz={30} fw={600}>
        A new request for a game has arrived!
      </Text>
      <StyledRow>
        <Text fz={20}>From:</Text>
        <UserInfo user={gameRequest.requestUser} isUserInfo={false} />
      </StyledRow>
      <StyledRow>
        <Text fz={20}>Code:</Text>
        <Text fz={20} fw={600}>
          {gameRequest.game.code}
        </Text>
      </StyledRow>
      <StyledRow>
        <Text fz={20}>Coins:</Text>
        <Text fz={20} fw={600}>
          {gameRequest.game.coins}
        </Text>
      </StyledRow>
      <StyledCenterBlock>
        <Button onClick={acceptGameRequest} type="secondary">
          <Text cursor="pointer" fz={20} fw={500}>
            Accept
          </Text>
        </Button>
        <Button onClick={rejectGameRequest}>
          <Text cursor="pointer" fz={20}>
            Reject
          </Text>
        </Button>
      </StyledCenterBlock>
    </StyledGameRequestContent>
  );
});
