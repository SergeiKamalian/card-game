import { ReactNode, memo } from "react";
import { StyledGeneralComment } from "./styles";

interface GeneralCommentProps {
  isUser: boolean;
  children: ReactNode;
}

export const GeneralComment = memo((props: GeneralCommentProps) => {
  const { isUser, children } = props;
  return <StyledGeneralComment isUser={isUser}>{children}</StyledGeneralComment>;
});
