import styled from "styled-components";

interface ButtonProps {
  themeType: "primary" | "secondary";
  size: "normal" | "small" | "big";
}

export const StyledButton = styled.button<ButtonProps>`
  height: ${(p) =>
    p.size === "normal" ? "50px" : p.size === "big" ? "60px" : "40px"};
  border-radius: 30px;
  background: #14161e;
  width: 100%;
  padding: 5px;
  cursor: pointer;
`;
export const StyledButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    16deg,
    rgba(40, 44, 59, 1) 0%,
    rgba(34, 39, 53, 1) 100%
  );
  border-radius: 30px;
`;
