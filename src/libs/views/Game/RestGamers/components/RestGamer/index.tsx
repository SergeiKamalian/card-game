import { memo, useMemo } from "react";
import { TGame, TGameTimes, TGamer } from "../../../../../types";
import {
  StyledLevelWrapper,
  StyledNameWrapper,
  StyledRestGamer,
} from "./styles";
import { Image, Level, Text } from "../../../../../ui";
import { RestGamerCards, GamerComments, TimeScale } from "./components";
import { useCalculateTimer } from "../../../../../hooks";

interface RestGamerProps {
  restGamer: TGamer;
  gameTimes: TGameTimes;
  game: TGame;
  isUser?: boolean;
}

export const RestGamer = memo((props: RestGamerProps) => {
  const { restGamer, game, gameTimes, isUser = false } = props;

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

  return (
    <StyledRestGamer>
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
