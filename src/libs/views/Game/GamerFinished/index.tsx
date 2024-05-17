import { memo, useEffect, useMemo, useState } from "react";
import { useGameContext, useUserContext } from "../../../contexts";
import { Image, Modal, Text, Wrapper } from "../../../ui";
import { WinnerScaleWithStars } from "./components";
import { StyledGameFinished, StyledMoneyWrapper, StyledRow } from "./styles";
import { MODAL_SIZES } from "../../../constants";
import coins from "../../../assets/images/coins.png";
import levelUp from "../../../assets/images/levelUp.png";
import {
  animate,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

export const GamerFinished = memo(() => {
  const { game } = useGameContext();
  const { user } = useUserContext();

  const [num, setNum] = useState(0);

  useEffect(() => {
    const controls = animate(num, 300, {
      duration: 1,
      onUpdate(value) {
        setNum(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [num]);

  const finishedPlace = useMemo(
    () =>
      game?.finishedGamersPlaces?.find(({ gamer }) => gamer.id === user?.id),
    [game?.finishedGamersPlaces, user?.id]
  );

  const gamerIsLoser = useMemo(
    () => !finishedPlace && !!game?.finished,
    [finishedPlace, game?.finished]
  );

  const modalTitle = useMemo(() => {
    if (finishedPlace) return "You win!";
    if (gamerIsLoser) return "You lose!";
    return "";
  }, [finishedPlace, gamerIsLoser]);

  const modalContent = useMemo(() => {
    return (
      <Wrapper
        padding="0"
        direction="column"
        alignItems="center"
        minWidth="100%"
        gap={20}
      >
        <WinnerScaleWithStars place={finishedPlace?.place || 0} />
        <StyledGameFinished>
          <StyledRow>
            <Text fz={20}>Your place:</Text>
            <Text fz={40} fw={700} lh={40}>
              {finishedPlace?.place || "-"}
            </Text>
          </StyledRow>
          <StyledRow>
            <StyledMoneyWrapper>
              + {num}
              <Image alt="coins" height="35px" url={coins} width="35px" />
            </StyledMoneyWrapper>
          </StyledRow>
        </StyledGameFinished>
      </Wrapper>
    );
  }, [finishedPlace?.place, num]);

  if (!game || !user) return null;

  return (
    <Modal
      title={modalTitle}
      isOpen={!!gamerIsLoser || !!finishedPlace}
      content={modalContent}
      heightFitContent
      size={MODAL_SIZES.SMALL}
    />
  );
});
