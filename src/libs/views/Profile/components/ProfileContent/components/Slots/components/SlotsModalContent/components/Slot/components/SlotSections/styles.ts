import styled, { keyframes } from "styled-components";
import {
  SLOT_ITEM_HEIGHT,
  SLOT_ITEM_WIDTH,
} from "../../../../../../../../../../../../constants/slots";

const winedHorizontalScaleAnimation = keyframes`
  0% {
    background: linear-gradient(
    180deg,
    rgba(255, 177, 3, 1) 0%,
    rgba(240, 89, 5, 1) 53%,
    rgba(255, 177, 3, 1) 100%
  );
  }
  50% {
    background: linear-gradient(
    180deg,
    rgba(255, 177, 3, 1) 0%,
    red 53%,
    rgba(255, 177, 3, 1) 100%
  );
  }
  100% {
    background: linear-gradient(
    180deg,
    rgba(255, 177, 3, 1) 0%,
    rgba(240, 89, 5, 1) 53%,
    rgba(255, 177, 3, 1) 100%
  );
  }
`;
const winedVerticalScaleAnimation = keyframes`
  0% {
    background: linear-gradient(
    90deg,
    rgba(255, 177, 3, 1) 0%,
    rgba(240, 89, 5, 1) 53%,
    rgba(255, 177, 3, 1) 100%
  );
  }
  50% {
    background: linear-gradient(
    90deg,
    rgba(255, 177, 3, 1) 0%,
    red 53%,
    rgba(255, 177, 3, 1) 100%
  );
  }
  100% {
    background: linear-gradient(
    90deg,
    rgba(255, 177, 3, 1) 0%,
    rgba(240, 89, 5, 1) 53%,
    rgba(255, 177, 3, 1) 100%
  );
  }
`;

export const StyledSlotSections = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`;
export const StyledLine = styled.div<{ left: number }>`
  width: 2px;
  height: 80%;
  background: ${(p) =>
    p.left &&
    "linear-gradient(0deg, transparent 0%, rgb(255 249 199) 50%, transparent 100%)"};
  position: absolute;
  top: 10%;
  left: ${(p) => `calc(${p.left}% - 5px)`};
`;
export const StyledVerticalWinnedLine = styled.div<{ index: number }>`
  width: 8px;
  height: ${`calc(100% - ${SLOT_ITEM_HEIGHT}px)`};
  top: ${`calc(${SLOT_ITEM_HEIGHT / 2}px)`};
  left: ${(p) =>
    `calc(${SLOT_ITEM_WIDTH / 2 + (p.index * SLOT_ITEM_WIDTH - 6)}px)`};
  background: linear-gradient(
    90deg,
    rgba(255, 177, 3, 1) 0%,
    rgba(240, 89, 5, 1) 53%,
    rgba(255, 177, 3, 1) 100%
  );
  box-shadow: rgba(240, 89, 5, 1) 0px 0px 5px;
  position: absolute;
  z-index: 3;
  border-radius: 5px;
  animation: ${winedVerticalScaleAnimation} 0.5s infinite none;
`;
export const StyledHorizontalWinnedLine = styled.div<{ index: number }>`
  height: 8px;
  width: ${`calc(100% - ${SLOT_ITEM_WIDTH}px)`};
  left: ${`calc(${SLOT_ITEM_WIDTH / 2}px)`};
  top: ${(p) => `calc(${SLOT_ITEM_HEIGHT / 2 + p.index * SLOT_ITEM_HEIGHT}px)`};
  background: linear-gradient(
    180deg,
    rgba(255, 177, 3, 1) 0%,
    rgba(240, 89, 5, 1) 53%,
    rgba(255, 177, 3, 1) 100%
  );
  box-shadow: rgba(240, 89, 5, 1) 0px 0px 5px;
  position: absolute;
  z-index: 3;
  border-radius: 5px;
  animation: ${winedHorizontalScaleAnimation} 0.5s infinite none;
`;
