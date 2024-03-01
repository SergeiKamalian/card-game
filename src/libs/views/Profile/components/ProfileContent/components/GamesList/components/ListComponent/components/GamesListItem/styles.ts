import styled from "styled-components";

export const StyledGamesListItem = styled.div`
  width: 100%;
  min-height: 60px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 10px 7px -10px rgba(0, 0, 0, 1);
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

export const StyledRow = styled.div<{ minWidth: string; gap?: string }>`
  min-width: ${(p) => p.minWidth};
  gap: ${(p) => p.gap};
  display: flex;
  align-items: center;
`;
