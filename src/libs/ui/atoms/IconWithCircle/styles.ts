import styled from "styled-components";

export const StyledIconWithCircle = styled.button<{ size: number }>`
  min-width: ${(p) => `${p.size}px`};
  height: ${(p) => `${p.size}px`};
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;
