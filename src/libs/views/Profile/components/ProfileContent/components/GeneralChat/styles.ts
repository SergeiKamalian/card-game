import styled from "styled-components";

export const StyledGeneralChat = styled.div`
  width: 100%;
  height: 100%;
  background: #12141ec2;
  box-shadow: ${(p) => p.theme.shadows.primary};
  border: 1px solid #7a788130;
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1200px) {
    display: none;
  }
`;
