import { memo } from "react";

import styled, { keyframes } from "styled-components";
import { useAppLoadingContext } from "../../../contexts";

export const Loading = memo(() => {
  const { appLoading } = useAppLoadingContext();
  
  if (!appLoading) return null;

  return (
    <StyledLoadingWrapper>
      <StyledLoader />
    </StyledLoadingWrapper>
  );
});

const StyledLoadingWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 55;
`;
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledLoader = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #fff;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
  position: relative;

  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-left: ${(p) => `4px solid ${p.theme.colors.purple3}`};
    border-bottom: 4px solid transparent;
    animation: ${rotate} 0.5s linear infinite reverse;
  }
`;
