import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { StyledBadge, StyledButton } from "./styles";
import { Text } from "../Text";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "primary" | "secondary";
  size?: "normal" | "small" | "big";
  loading?: boolean;
  success?: boolean;
  disabled?: boolean;
  margin?: string;
  padding?: string;
  btnType?: "submit" | "button" | "reset";
  className?: string;
  children: ReactNode;
  isCircle?: boolean;
  circleSize?: number;
  badge?: string | number;
  widthFitContent?: boolean;
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
    badge,
    children,
    widthFitContent = false,
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
      widthFitContent={widthFitContent}
    >
      {children}
      {badge ? (
        <StyledBadge>
          <Text>{badge}</Text>
        </StyledBadge>
      ) : null}
    </StyledButton>
  );
};
