import { memo } from "react";
import { StyledSlotScales } from "./styles";
import { SlotScale } from "./components";
import { SlotValues, WinnedLines } from "../../../../useSlot";

interface SlotScalesProps {
  slotValues: SlotValues;
  isAnimation: boolean;
  setIsAnimation: (animation: boolean) => void;
  checkSlotOnFinish: () => Promise<void>;
  winnedValues: WinnedLines;
  isWinView: boolean;
}

export const SlotScales = memo((props: SlotScalesProps) => {
  const {
    slotValues,
    isAnimation,
    setIsAnimation,
    checkSlotOnFinish,
    winnedValues,
    isWinView,
  } = props;

  return (
    <StyledSlotScales>
      {slotValues.map((item, index) => (
        <SlotScale
          isAnimation={isAnimation}
          setIsAnimation={setIsAnimation}
          checkSlotOnFinish={checkSlotOnFinish}
          winnedValues={winnedValues}
          isWinView={isWinView}
          key={index}
          item={item}
          index={index}
        />
      ))}
    </StyledSlotScales>
  );
});
