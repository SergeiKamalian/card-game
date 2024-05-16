import { memo } from "react";
import { StyledModalFooter, StyledTopLine } from "./styles";

export const ModalFooter = memo(() => {
  return (
    <StyledModalFooter>
      <StyledTopLine />
    </StyledModalFooter>
  );
});
