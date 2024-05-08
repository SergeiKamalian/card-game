import styled from "styled-components";

interface ButtonProps {
  themeType: "primary" | "secondary";
  size: "normal" | "small" | "big";
  isCircle?: boolean;
  circleSize?: number;
}

export const StyledButton = styled.button<ButtonProps>`
  height: ${(p) =>
    p.size === "normal" ? "50px" : p.size === "big" ? "60px" : "40px"};
  border-radius: ${(p) => (p.isCircle ? "50%" : "8px")};
  background: #14161e;
  padding: 3px;
  cursor: pointer;
  min-width: ${(p) => p.isCircle && p.circleSize && `${p.circleSize}px`};
  height: ${(p) => p.isCircle && p.circleSize && `${p.circleSize}px`};
  position: relative;
  transform: ${(p) => !p.isCircle && "matrix(1, -0.02, -0.04, 1, 0, 0)"};
  background: ${(p) =>
    `linear-gradient(90deg, ${p.theme.colors.tertiary} 4.17%, ${p.theme.colors.secondary})`};
  box-shadow: 0 5px 15px #07080d, inset 0 0 15px #2e334b;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
  width: ${(p) => (p.isCircle ? `${p.circleSize}px` : "95%")};
  margin: 0 auto;
  margin: 10px 0;

  &:hover {
    transform: ${(p) =>
      !p.isCircle && "matrix(1, -0.02, -0.04, 1, 0, 0) scale(1.05)"};
  }
  > * {
    cursor: pointer !important;
  }
  p {
    font-weight: 700;
  }
`;
export const StyledButtonContent = styled.div<{
  type: "primary" | "secondary";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${(p) =>
    p.type === "primary"
      ? p.theme.gradients.primaryButton
      : p.theme.gradients.secondaryButton};
  border-radius: 30px;
  box-shadow: 3px 3px 4px 0px rgb(89 73 146) inset;
  padding: 0 30px;
`;

export const StyledBadge = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  border-radius: 20px;
  padding: 2px 12px;
  background-color: #ff5900;
`;
