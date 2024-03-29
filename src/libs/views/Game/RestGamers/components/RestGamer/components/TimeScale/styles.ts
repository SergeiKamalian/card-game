import styled from "styled-components";

export const StyledTimeScale = styled.div`
  width: 100%;
  height: 10px;
  width: 30px;
  height: 30px;
  border-radius: 0 0 10px 10px;
  background: ${p => p.theme.colors.purple1};
  position: absolute;
  top: 0;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px black;
`;

