import styled from "styled-components";

export const StyledImageSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
`;
export const StyledImageSelector = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  opacity: 0;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;
export const StyledLoadingWrapper = styled(StyledImageSelector)<{
  isLoading: boolean;
}>`
  z-index: ${(p) => (p.isLoading ? 2 : "auto")};
  opacity: ${(p) => (p.isLoading ? 1 : 0)};
  background: rgba(0, 0, 0, 0.8);
`;
export const StyledAddButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StyledInput = styled.input`
  display: none;
`;
