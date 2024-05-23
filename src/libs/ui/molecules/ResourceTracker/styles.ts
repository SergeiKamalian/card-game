import styled from "styled-components";

export const StyledResourceTracker = styled.div<{ isSlotItem: boolean }>`
  min-width: 130px;
  width: fit-content;
  height: 50px;
  border-radius: 50px;
  background: #12141ec2;
  box-shadow: 2px 13px 75px -14px rgba(0, 0, 0, 1);
  border: 1px solid #7a788130;
  backdrop-filter: blur(10px);
  padding: 5px;
  padding-left: 75px;
  position: relative;
  padding: ${(p) => p.isSlotItem && "5px 10px"};
  padding-left: ${(p) => p.isSlotItem && "65px"};

  * {
    font-family: ${(p) => p.isSlotItem && "KnightWarrior"};
    font-size: ${(p) => p.isSlotItem && "25px"};
    text-shadow: ${(p) => p.isSlotItem && "0 0 5px #000000cc"};
  }

  > img {
    position: absolute;
    left: 0;
    top: -5px;
  }
`;
