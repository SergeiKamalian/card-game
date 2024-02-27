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
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    type = "primary",
    loading,
    success,
    disabled,
    size = "normal",
    // leftIcon,
    // rightIcon,
    // iconSize = 30,
    btnType = undefined,
    children,
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
      type={btnType}
      themeType={type}
      size={size}
    >
      <StyledButtonContent>{children}</StyledButtonContent>
    </StyledButton>
  );
};
