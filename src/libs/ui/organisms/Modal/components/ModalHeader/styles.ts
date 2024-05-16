import styled from "styled-components";

export const StyledModalHeader = styled.div<{ isCenterContent: boolean }>`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.isCenterContent ? "center" : "space-between")};
  padding: 0 20px;
  position: relative;
  background: ${p=> p.theme.gradients.form};
`;
export const StyledModalHeaderLeftSlide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > button {
    background: none;
    height: 30px;
    cursor: pointer;
  }
`;
export const StyledTopLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  width: 60%;
  background: linear-gradient(to left, transparent, #3e4a82, transparent);
`;
export const StyledBottomLine = styled(StyledTopLine)`
  top: unset;
  bottom: -1px;
  width: 100%;
  height: 2px;
`