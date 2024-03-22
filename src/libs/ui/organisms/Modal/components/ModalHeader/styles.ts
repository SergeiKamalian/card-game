import styled from "styled-components";

export const StyledModalHeader = styled.div<{ isCenterContent: boolean }>`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: ${p => p.isCenterContent ? 'center' : 'space-between'};
  padding: 0 20px;
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
