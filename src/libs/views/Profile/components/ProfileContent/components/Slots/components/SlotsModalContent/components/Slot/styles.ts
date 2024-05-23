import styled from "styled-components";
import {
  SLOT_ITEM_HEIGHT,
  SLOT_ITEM_WIDTH,
} from "../../../../../../../../../../constants/slots";

export const StyledSlot = styled.div`
  display: flex;
  flex-direction: column;
  width: ${`calc(4 * ${SLOT_ITEM_WIDTH}px + 30px)`};
  height: ${`calc(3 * ${SLOT_ITEM_HEIGHT}px + 30px)`};
  background: linear-gradient(
    90deg,
    rgba(255, 177, 3, 1) 0%,
    rgba(240, 89, 5, 1) 53%,
    rgba(255, 177, 3, 1) 100%
  );
  box-shadow: rgba(240, 89, 5, 1) 0px 0px 25px;
  margin: 0 auto;
  border-radius: 110px;
  padding: 15px;
`;
export const StyledSlotContent = styled.div`
  width: 100%;
  height: 100%;
  background: #12141e;
  border-radius: 100px;
  border: 1px solid #1617269c;
  box-shadow: 0 0 10px #141823;
  position: relative;
  overflow: hidden;
`;
export const StyledSlotContentBg = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  filter: blur(5px);
`;
