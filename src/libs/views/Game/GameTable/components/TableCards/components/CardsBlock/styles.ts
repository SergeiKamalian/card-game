import styled from "styled-components";

export const StyledCardsBlock = styled.div`
  height: fit-content;
  position: relative;
  min-width: 136px;
`;
export const StyledAttackerCard = styled.div<{isFinish: boolean}>`
  width: 136px;
  height: 190px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: -5px 5px 5px hsla(0, 0%, 0%, 0.20);
  cursor: ${p => !p.isFinish && 'pointer'};
`;
export const StyledDefenderCard = styled.div`
  width: 136px;
  height: 190px;
  position: absolute;
  top: 14px;
  left: 14px;
  rotate: 10deg;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: -5px 5px 5px hsla(0, 0%, 0%, 0.20);
`;
