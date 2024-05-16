import { memo } from "react";
import { StyledHeader } from "./styles";

interface ModalHeaderProps {
  title: string;
}

export const ModalHeader = memo((props: ModalHeaderProps) => {
  const { title } = props;

  return <StyledHeader>{title}</StyledHeader>;
});
