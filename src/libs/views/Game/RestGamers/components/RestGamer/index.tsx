import { memo, useMemo } from "react";
import { TGame, TGameTimes, TGamer } from "../../../../../types";
import {
  StyledDisconnectWrapper,
  StyledLevelWrapper,
  StyledNameWrapper,
  StyledRestGamer,
} from "./styles";
import { Image, Level, Text } from "../../../../../ui";
import {
  RestGamerCards,
  GamerComments,
  TimeScale,
  GeneralComment,
} from "./components";
import { useCalculateTimer } from "../../../../../hooks";
import { GAMER_STATUSES } from "../../../../../constants";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useTheme } from "styled-components";

interface RestGamerProps {
  restGamer: TGamer;
  gameTimes: TGameTimes;
  game: TGame;
  isUser?: boolean;
}

export const RestGamer = memo((props: RestGamerProps) => {
  const { restGamer, game, gameTimes, isUser = false } = props;

  const theme = useTheme();

  const isAttacker = useMemo(
    () => game.attacker === restGamer.info.name,
    [game.attacker, restGamer.info.name]
  );
  const isDefender = useMemo(
    () => game.defender === restGamer.info.name,
    [game.defender, restGamer.info.name]
  );

  const position = useMemo(() => {
    if (isAttacker) return "attacker";
    if (isDefender) return "defender";
    return null;
  }, [isAttacker, isDefender]);

  const maxTime = useMemo(() => {
    if (!isAttacker && !isDefender) return null;
    if (isAttacker) return gameTimes.attackerFinishTime;
    if (isDefender) return gameTimes.defenderFinishTime;
    return null;
  }, [
    gameTimes.attackerFinishTime,
    gameTimes.defenderFinishTime,
    isAttacker,
    isDefender,
  ]);

  const percents = useCalculateTimer(maxTime, position);

  const gamerIsDisabled = useMemo(
    () => restGamer.status === GAMER_STATUSES.SUSPENDED,
    [restGamer.status]
  );

  const gamerIsSurrendered = useMemo(
    () => game?.defender === restGamer?.info.name && game?.defenderSurrendered,
    [game?.defender, game?.defenderSurrendered, restGamer?.info.name]
  );

  return (
    <StyledRestGamer disabled={gamerIsDisabled}>
      {gamerIsDisabled ? (
        <StyledDisconnectWrapper>
          {<VscDebugDisconnect size={60} color={theme.colors.white} />}
        </StyledDisconnectWrapper>
      ) : null}
      {gamerIsSurrendered ? (
        <GeneralComment isUser={isUser}>I give up</GeneralComment>
      ) : null}
      <Image
        alt={restGamer.info.name}
        url={restGamer.info.avatarURL}
        width="100%"
        height="70%"
        borderRadius="10px"
      />
      <StyledNameWrapper>
        <Text>{restGamer.info.name}</Text>
      </StyledNameWrapper>
      {!isUser ? (
        <RestGamerCards cardsCount={restGamer.cards.length} />
      ) : (
        <GamerComments position={position} />
      )}
      {maxTime && <TimeScale percents={percents} />}
      <StyledLevelWrapper>
        <Level level={restGamer.info.level} />
      </StyledLevelWrapper>
    </StyledRestGamer>
  );
});
