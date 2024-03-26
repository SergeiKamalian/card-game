import styled from "styled-components";

export const StyledProfileContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 50px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1200px) {
    gap: 30px;
  }
`;
