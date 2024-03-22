import styled from "styled-components";

export const StyledBitoCards = styled.div`
  min-width: 200px;
`;
export const StyledBitoCard = styled.div<{ rotate: number }>`
  rotate: ${p => `${p.rotate}deg`};
  position: absolute;
`;
