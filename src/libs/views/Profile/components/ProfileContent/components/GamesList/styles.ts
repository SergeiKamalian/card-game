import styled from "styled-components";

export const StyledGamesList = styled.div`
  width: 50%;
  height: 100%;
  background: ${(p) => p.theme.gradients.form};
  box-shadow: ${(p) => p.theme.shadows.primary};
  border-radius: 30px;
  padding: 15px;
`;
