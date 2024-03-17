import { memo, useMemo } from "react";
import { TGame, TGameTimes, TGamer } from "../../../../../types";
import {
  StyledDisconnectWrapper,
  StyledInviteWrapper,
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
import { MdPersonAddAlt } from "react-icons/md";

interface RestGamerProps {
  restGamer: TGamer | null;
  gameTimes: TGameTimes | null;
  game: TGame;
  isUser?: boolean;
  isStartingView?: boolean;
  onInvite?: () => void;
}

export const RestGamer = memo((props: RestGamerProps) => {
  const {
    restGamer,
    game,
    gameTimes,
    isUser = false,
    isStartingView = false,
    onInvite,
  } = props;

  const theme = useTheme();

  const isAttacker = useMemo(
    () => game.attacker === restGamer?.info.name,
    [game.attacker, restGamer?.info.name]
  );
  const isDefender = useMemo(
    () => game.defender === restGamer?.info.name,
    [game.defender, restGamer?.info.name]
  );

  const position = useMemo(() => {
    if (isAttacker) return "attacker";
    if (isDefender) return "defender";
    return null;
  }, [isAttacker, isDefender]);

  const maxTime = useMemo(() => {
    if (!isAttacker && !isDefender) return null;
    if (isAttacker) return gameTimes?.attackerFinishTime;
    if (isDefender) return gameTimes?.defenderFinishTime;
    return null;
  }, [
    gameTimes?.attackerFinishTime,
    gameTimes?.defenderFinishTime,
    isAttacker,
    isDefender,
  ]);

  const percents = useCalculateTimer(maxTime || "", position);

  const gamerIsDisabled = useMemo(
    () => restGamer?.status === GAMER_STATUSES.SUSPENDED,
    [restGamer?.status]
  );

  const gamerIsSurrendered = useMemo(
    () => game?.defender === restGamer?.info.name && game?.defenderSurrendered,
    [game?.defender, game?.defenderSurrendered, restGamer?.info.name]
  );

  return (
    <StyledRestGamer onClick={onInvite} disabled={gamerIsDisabled} isInvite={!!onInvite}>
      {gamerIsDisabled ? (
        <StyledDisconnectWrapper>
          {<VscDebugDisconnect size={60} color={theme.colors.white} />}
        </StyledDisconnectWrapper>
      ) : null}
      {gamerIsSurrendered ? (
        <GeneralComment isUser={isUser}>I give up</GeneralComment>
      ) : null}
      {!onInvite && (
        <Image
          alt={restGamer?.info.name || ""}
          url={restGamer?.info.avatarURL || ""}
          width="100%"
          height="140px"
          borderRadius="10px"
        />
      )}
      <StyledNameWrapper isStartingView={isStartingView}>
        <Text>{restGamer?.info.name || 'Invite friend'}</Text>
      </StyledNameWrapper>
      {!isStartingView ? (
        !isUser ? (
          <RestGamerCards cardsCount={restGamer?.cards.length || 1} />
        ) : (
          <GamerComments position={position} />
        )
      ) : null}
      {maxTime && <TimeScale percents={percents} />}
      {!onInvite && (
        <StyledLevelWrapper isStartingView={isStartingView}>
          <Level level={restGamer?.info.level || 1} />
        </StyledLevelWrapper>
      )}
      {onInvite && (
        <StyledInviteWrapper className="inviteWrapper">
          <MdPersonAddAlt size={50} color={theme.colors.purpleLight} />
        </StyledInviteWrapper>
      )}
    </StyledRestGamer>
  );
});
