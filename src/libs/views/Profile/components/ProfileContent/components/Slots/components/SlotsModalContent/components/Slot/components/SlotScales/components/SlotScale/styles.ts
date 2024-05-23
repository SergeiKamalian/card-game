import styled, { keyframes } from "styled-components";
import { SLOT_ITEM_HEIGHT } from "../../../../../../../../../../../../../../constants/slots";
import { motion } from "framer-motion";

const animate = keyframes`
  0% {
    filter: drop-shadow(0 0 5px black);
    scale: 1;
  }
  50% {
    filter: drop-shadow(0 0 10px black);
    scale: 1.2;
  }
  100% {
    filter: drop-shadow(0 0 5px black);
    scale: 1;
  }
`;

export const StyledSlotScale = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .winnedItem {
    img {
      animation: ${animate} 1s infinite ease-in-out;
    }
  }
`;
export const StyledSlotItem = styled.div`
  width: 100%;
  min-height: ${`${SLOT_ITEM_HEIGHT}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  > img {
    filter: drop-shadow(2px 4px 6px black);
  }
  > :first-child {
    position: relative;
    z-index: 2;
  }
`;
export const StyledSlotItemsGroup = styled(motion.div)`
  width: 100%;
  height: ${(p) => `calc(${SLOT_ITEM_HEIGHT * 12}px)`};
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
`;
export const StyledWinWrapper = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  /* transform: scale(1.5); */
  opacity: 0.5;
  border-radius: 50%;
`;
