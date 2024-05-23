import { memo, useEffect, useMemo, useState } from "react";
import {
  StyledSlotActions,
  StyledSpinButton,
  StyledSpinWrapper,
  StyledWinWrapper,
} from "./styles";
import { Image, Wrapper } from "../../../../../../../../../../ui";
import slotCoins from "../../../../../../../../../../assets/images/coins.png";
import { animate } from "framer-motion";
import { numberWithSpaces } from "../../../../../../../../../../utils";

interface SlotActionsProps {
  onSpin: () => void;
  activeBet: number;
  setActiveBet: (bet: number) => void;
  lastWin: {
    timestamp: number;
    count: number;
  } | null;
  isAnimation: boolean;
}

export const SlotActions = memo((props: SlotActionsProps) => {
  const { onSpin, activeBet, setActiveBet, lastWin, isAnimation } = props;

  const bets = useMemo(() => [50, 100, 250, 500], []);

  const [num, setNum] = useState(0);

  useEffect(() => {
    if (!lastWin) return;
    const controls = animate(num, lastWin.count, {
      duration: 1,
      onUpdate(value) {
        setNum(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [lastWin, num, isAnimation]);

  return (
    <StyledSlotActions>
      <Wrapper padding="0" direction="row">
        {bets.map((bet) => (
          <StyledSpinButton
            active={bet === activeBet}
            key={bet}
            size="small"
            onClick={() => setActiveBet(bet)}
          >
            {bet}
          </StyledSpinButton>
        ))}
      </Wrapper>
      <StyledWinWrapper>
        <StyledSpinButton active size="small" isNotButton>
          {isAnimation && lastWin ? (
            <>
              {numberWithSpaces(isAnimation ? num : lastWin.count)}
              <Image alt="coins" height="45px" url={slotCoins} width="45px" />
            </>
          ) : (
            "-"
          )}
        </StyledSpinButton>
      </StyledWinWrapper>
      <StyledSpinWrapper>
        <StyledSpinButton active size="large" onClick={onSpin}>
          SPIN
        </StyledSpinButton>
      </StyledSpinWrapper>
    </StyledSlotActions>
  );
});
