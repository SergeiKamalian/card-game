import { memo } from "react";
import styled from "styled-components";
import bg from "../../../assets/images/bgImage.webp";

export const Background = memo(() => {
  return (
    <>
      <StyledBackgroundGradient />
      <StyledBackground src={bg} />
      <StyledBackdropFilter />
    </>
  );
});

const StyledBackground = styled.img`
  width: 100vw;
  height: 100svh;
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
`;
const StyledBackgroundGradient = styled.div`
  width: 100vw;
  height: 100svh;
  position: fixed;
  top: 0;
  left: 0;
  background: radial-gradient(circle, #22242f, #12141e);
  z-index: 1;
  opacity: 0.5;
`;
const StyledBackdropFilter = styled(StyledBackgroundGradient)`
  opacity: 1;
  background: none;
  backdrop-filter: blur(7.5px);
`;
