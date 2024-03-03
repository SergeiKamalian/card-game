import styled from "styled-components";

export const StyledRestGamer = styled.div`
  width: 140px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 9px 16px 20px -12px black;
  position: relative;
  overflow: hidden;
`;
export const StyledNameWrapper = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
export const StyledLevelWrapper = styled.div`
  position: absolute;
  bottom: 67px;
  left: 50%;
  transform: translateX(-50%);
`