import styled from "styled-components";

export const StyledCard = styled.button<{
  left?: number;
  selected: boolean;
  withActions: boolean;
}>`
  background: none;
  cursor: ${(p) => p.withActions && "pointer"};
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: -5px 5px 5px hsla(0, 0%, 0%, 0.25);
  transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
  &:hover {
    box-shadow: ${(p) =>
      p.withActions && `'-5px 5px 5px ${p.theme.colors.purpleLight}'`};
    transform: ${(p) => p.withActions && "translateY(-20px)"};
  }
  transform: ${(p) => p.selected && "translateY(-20px)"};
  position: ${(p) => p.left && "absolute"};
  left: ${(p) => p.left && `${p.left}px`};
`;
