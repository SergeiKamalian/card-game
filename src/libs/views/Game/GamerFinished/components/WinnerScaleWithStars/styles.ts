import styled from "styled-components";

export const StyledStar = styled.img<{ isFilled: boolean }>`
  height: 60px;
  filter: ${(p) => !p.isFilled && "grayscale(100%)"};
`;
