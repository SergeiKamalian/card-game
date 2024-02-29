import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { StyledButton, StyledButtonContent } from "./styles";

// import {
//   BigBtn,
//   NormalBtn,
//   PrimaryBtn,
//   SecondaryBtn,
//   SmallBtn,
// } from './styles';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "primary" | "secondary";
  size?: "normal" | "small" | "big";
  loading?: boolean;
  success?: boolean;
  disabled?: boolean;
  margin?: string;
  padding?: string;
  // leftIcon?: string | keyof typeof Icons;
  // rightIcon?: string | keyof typeof Icons;
  // iconSize?: number;
  btnType?: "submit" | "button" | "reset";
  className?: string;
  children: ReactNode;
  isCircle?: boolean;
  circleSize?: number;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    type = "primary",
    loading,
    success,
    disabled,
    size = "normal",
    btnType = undefined,
    isCircle,
    circleSize,
    children,
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
      type={btnType}
      themeType={type}
      size={size}
      isCircle={isCircle}
      circleSize={circleSize}
    >
      <StyledButtonContent type={type}>{children}</StyledButtonContent>
    </StyledButton>
  );
};
