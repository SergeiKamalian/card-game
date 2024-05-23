import { memo } from "react";
import {
  StyledSlotSections,
  StyledLine,
  StyledVerticalWinnedLine,
  StyledHorizontalWinnedLine,
} from "./styles";
import { WinnedLines } from "../../../../useSlot";

interface SlotSectionsProps {
  winnedValues: WinnedLines;
  isWinView: boolean;
}

export const SlotSections = memo((props: SlotSectionsProps) => {
  const { winnedValues, isWinView } = props;

  return (
    <StyledSlotSections>
      {isWinView
        ? winnedValues.vertical.map(({ index }) => (
            <StyledVerticalWinnedLine index={index} key={index} />
          ))
        : null}
      {isWinView
        ? winnedValues.horizontal.map(({ index }) => (
            <StyledHorizontalWinnedLine index={index} key={index} />
          ))
        : null}
      {new Array(4).fill(null).map((_, index) => (
        <StyledLine left={25 * index} key={index} />
      ))}
    </StyledSlotSections>
  );
});
