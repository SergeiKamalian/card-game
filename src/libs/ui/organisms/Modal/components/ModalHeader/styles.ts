import styled from "styled-components";

export const StyledHeader = styled.div`
  position: absolute;
  padding: 0 20px;
  width: fit-content;
  height: 80px;
  transform: translate(-50%, 0px) skew(0deg, 0deg);
  position: absolute;
  left: 50%;
  top: -40px;
  background: rgb(18 20 30);
  box-shadow: ${(p) => p.theme.shadows.primary};
  border: 1px solid #7a788130;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: white;
  font-family: "KnightWarrior";
  text-wrap: nowrap;
`;
