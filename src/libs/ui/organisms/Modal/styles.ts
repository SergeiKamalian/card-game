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
`;
export const ModalContainer = styled(motion.div)<{
  modalWidth: string;
  heightFitContent: boolean;
}>`
  background: ${(p) => p.theme.gradients.form};
  min-height: ${p => !p.heightFitContent && '70%'};
  overflow-y: auto;
  border-radius: 12px;
  width: ${(p) => p.modalWidth};
  max-height: calc(100vh - 20px);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5);
  z-index: 901;
`;
export const StyledModalBody = styled.div`
  padding: 20px;
`;
