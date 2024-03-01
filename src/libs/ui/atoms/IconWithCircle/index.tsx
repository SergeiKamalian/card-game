import { ReactNode, memo } from "react";
import { StyledIconWithCircle } from "./styles";

interface IconWithCircleProps {
  icon: ReactNode;
  onClick: () => void;
  size?: number;
}

export const IconWithCircle = memo((props: IconWithCircleProps) => {
  const { icon, onClick, size = 30 } = props;
  return (
    <StyledIconWithCircle size={size} onClick={onClick}>
      {icon}
    </StyledIconWithCircle>
  );
});
