import { ReactNode, memo } from "react";
import { StyledIconWithCircle } from "./styles";

interface IconWithCircleProps {
  icon: ReactNode;
  onClick: () => void;
  size?: number;
  isDisabled?: boolean;
}

export const IconWithCircle = memo((props: IconWithCircleProps) => {
  const { icon, onClick, size = 30, isDisabled = false } = props;

  return (
    <StyledIconWithCircle
      disabled={isDisabled}
      className="icon-with-circle"
      size={size}
      onClick={onClick}
    >
      {icon}
    </StyledIconWithCircle>
  );
});
