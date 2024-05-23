import { memo } from "react";
import { StyledSlot, StyledSlotContent, StyledSlotContentBg } from "./styles";
import bg from "../../../../../../../.../../../../../assets/images/slots.webp";
import { SlotScales, SlotSections } from "./components";
import { SlotValues, WinnedLines } from "../../useSlot";

interface SlotProps {
  slotValues: SlotValues;
  isAnimation: boolean;
  setIsAnimation: (animation: boolean) => void;
  checkSlotOnFinish: () => Promise<void>;
  winnedValues: WinnedLines;
  isWinView: boolean;
}

export const Slot = memo((props: SlotProps) => {
  const {
    slotValues,
    isAnimation,
    setIsAnimation,
    checkSlotOnFinish,
    winnedValues,
    isWinView,
  } = props;

  return (
    <StyledSlot>
      <StyledSlotContent>
        <StyledSlotContentBg src={bg} alt="bg" />
        <SlotSections winnedValues={winnedValues} isWinView={isWinView} />
        <SlotScales
          slotValues={slotValues}
          isAnimation={isAnimation}
          setIsAnimation={setIsAnimation}
          checkSlotOnFinish={checkSlotOnFinish}
          winnedValues={winnedValues}
          isWinView={isWinView}
        />
      </StyledSlotContent>
    </StyledSlot>
  );
});
