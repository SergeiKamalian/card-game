import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledNotificationWrapper = styled(motion.div)`
  position: fixed;
  top: 5%;
  left: 50%;
  z-index: 123;
  transform: translateX(-50%);
  background: ${(p) => p.theme.colors.secondary};
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  align-items: center;
`;
export const StyledNotificationTitle = styled.span`
  font-size: 14px;
  color: rgb(128 113 135);
  text-transform: capitalize;
`;
export const StyledNotificationBody = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #b3a582;
  text-align: center;
`;
export const StyledLeftGradient = styled.div`
  position: absolute;
  height: 100%;
  width: 50px;
  background: red;
  left: -40px;
  top: 0;
  background: ${(p) =>
    `linear-gradient(90deg, transparent 0%, ${p.theme.colors.secondary} 50%)`};
`;
export const StyledRightGradient = styled(StyledLeftGradient)`
  left: unset;
  right: -40px;
  transform: rotate(180deg);
`;
export const StyledBottomLine = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 2px;
  bottom: -1px;
  background: linear-gradient(to left, transparent, #b3a582, transparent);
`;
export const StyledTopLine = styled(StyledBottomLine)`
  bottom: unset;
  top: -1px;
  width: 50%;
`;
export const StyledLogoWrapper = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -27px;
  border-radius: 50%;
  box-shadow: 0 0 5px #b3a582;

  img {
    width: 100%;
    height: 100%;
  }
`;
