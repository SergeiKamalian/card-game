import styled from "styled-components";

export const StyledTimeScale = styled.div`
  width: 100%;
  height: 10px;
  background: red;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;
export const StyledHaveTimeScale = styled.div<{ width: number, bg: string }>`
  height: 100%;
  width: ${(p) => `${p.width}%`};
  background: ${p => p.bg};
  transition: all 1.5s;
  opacity: 1;
`;
