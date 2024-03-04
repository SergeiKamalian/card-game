import styled from "styled-components";

export const StyledGeneralComment = styled.div<{ isUser: boolean }>`
  width: 200px;
  height: 40px;
  background: ${p => p.theme.colors.white};
  position: absolute;
  top: ${(p) => p.isUser && "-60px"};
  bottom: ${(p) => !p.isUser && "-60px"};
  box-shadow: 0 0 13px -2px rgba(0,0,0,0.5);
  border-radius: 10px;
  left: -30px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    margin-left: 0;
    border-top-color: ${p => p.theme.colors.white};
    border-top-style: solid;
    border-top-width: 8px;
    content: "";
    left: calc(50% - 8px);
    bottom: ${p => p.isUser && '-8px'};
    top: ${p => !p.isUser && '-8px'};
    rotate: ${p => !p.isUser && '180deg'};
    position: absolute;
  }
`;
