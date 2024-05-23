import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalOverlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
`;
export const ModalContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;
export const StyledModalContainerContent = styled.div<{
  modalWidth: string;
  heightFitContent: boolean;
  isFullscreen: boolean;
}>`
  transform: ${(p) =>
    !p.isFullscreen ? "translate(0px, 0px) skew(0deg, -2deg) !important" : 'translate(-10px, -10px)'};
  width: ${(p) => p.isFullscreen ? '96%' : p.modalWidth};
  max-height: ${ p => !p.isFullscreen && 'calc(100vh - 20px)'};
  height: ${(p) => !p.heightFitContent && "70%"};
  height: ${p => p.isFullscreen && '96%'};
  box-shadow: ${(p) => p.theme.shadows.primary};
  border: 1px solid #7a788130;
  backdrop-filter: blur(10px);
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledModalBody = styled.div`
  padding: 20px;
  background: ${(p) => p.theme.colors.tertiary};
`;
export const StyledBgImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50px;
  opacity: 0.1;
  object-fit: cover;
`;
export const StyledInnerContentBg = styled(StyledBgImage)`
  border-radius: 0;
  z-index: 1;
  opacity: 0.025;
`;
export const StyledInnerContent = styled.div`
  width: 95%;
  height: 95%;
  background: rgb(18 20 30);
  box-shadow: ${(p) => p.theme.shadows.primary};
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px solid #7a788130;
  padding: 60px 30px 30px;
`;
export const StyledCloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 4;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: 0 0 10px white;
  opacity: 0.9;
  &:hover {
    box-shadow: 0 0 20px white;
    opacity: 1;
  }
`;
export const StyledContent = styled.div`
  position: relative;
  z-index: 4;
  top: -30px;
`;
export const StyledModalBgImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
`;
