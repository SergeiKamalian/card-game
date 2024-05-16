import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledTimerWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "KnightWarrior";
  color: ${(p) => p.theme.colors.white};
  font-size: 200px;
`;

export const StyledTimerText = styled.div`
  position: absolute;
  font-size: 200px;
  height: 230px;
  * {
    font-family: "KnightWarrior";
  }
`;

export const StyledTimerTextItem = styled.span`
  z-index: 1;
  position: relative;
  top: -17px;
`;
export const StyledTimerTextItemBorder = styled.span`
  color: #b3a582;
  position: absolute;
  text-shadow: 0 0 30px black;
  transform: translate(5px, 10px);
  left: 0;
`;
