import styled from "styled-components";

export const StyledLeftGameButton = styled.button`
  height: 50px;
  background: ${(p) => p.theme.colors.error};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 0 10px ${(p) => p.theme.colors.error};
  transition: all 0.1s;
  color: white; 
  font-size: 17px;
  &:hover {
    box-shadow: 0 0 30px ${(p) => p.theme.colors.error};
  }
  padding: 20px 30px;
`;
