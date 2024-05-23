import { memo } from "react";
import { StyledSlotsModalContent } from "./styles";
import { Slot, SlotActions } from "./components";
import { useSlot } from "./useSlot";

export const SlotsModalContent = memo(() => {
  const {
    randomizeSlotValues,
    slotValues,
    isAnimation,
    setIsAnimation,
    checkSlotOnFinish,
    winnedValues,
    activeBet,
    setActiveBet,
    isWinView,
    lastWin
  } = useSlot();

  return (
    <StyledSlotsModalContent>
      <Slot
        slotValues={slotValues}
        isAnimation={isAnimation}
        setIsAnimation={setIsAnimation}
        checkSlotOnFinish={checkSlotOnFinish}
        winnedValues={winnedValues}
        isWinView={isWinView}
      />
      <SlotActions
        setActiveBet={setActiveBet}
        activeBet={activeBet}
        onSpin={randomizeSlotValues}
        lastWin={lastWin}
        isAnimation={isAnimation}
      />
    </StyledSlotsModalContent>
  );
});
