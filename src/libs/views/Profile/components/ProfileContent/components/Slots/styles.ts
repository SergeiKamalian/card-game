import styled from "styled-components";

export const StyledSlots = styled.div`
  width: 100%;
  height: 150px;
  /* padding: 20px; */
  background: #12141ec2;
  box-shadow: 2px 13px 75px -14px rgba(0, 0, 0, 1);
  border: 1px solid #7a788130;
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  * {
    transition: all 0.5s;
  }
  &:hover {
    .slots-bg {
      transform: scale(1.05);
    }
    .slots-logo {
      transform: scale(1.1);
    }
  }
`;
export const StyledSlotsContent = styled.div`
  width: 100%;
  height: 100%;
  /* height: 200px; */
  border-radius: 25px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledBackground = styled.img`
  position: absolute;
  width: 155%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  box-shadow: 0 0 5px black;
  filter: blur(1px);
`;
export const StyledLogo = styled.img`
  height: 80%;
  filter: drop-shadow(5px 5px 5px black);
`;

export const StyledHoverBlock = styled.div`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;
export const StyledModalHeader = styled(StyledLogo)`
`;
