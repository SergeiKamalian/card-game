import styled from "styled-components";

export const StyledModalFooter = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
  background: radial-gradient(circle, rgb(35 42 72) 0%, transparent 100%);
  position: absolute;
  bottom: 0;
`;
export const StyledTopLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  width: 100%;
  background: linear-gradient(to left, transparent, #3e4a82, transparent);
`;
