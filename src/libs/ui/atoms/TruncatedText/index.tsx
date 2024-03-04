import { ReactNode, memo } from "react";

import styled from "styled-components";

interface TruncatedTextProps {
  children: ReactNode;
  lineClamp: number;
}

export const TruncatedText = memo((props: TruncatedTextProps) => {
  const { children, lineClamp } = props;
  return (
    <StyledTruncatedText $lineClamp={lineClamp}>{children}</StyledTruncatedText>
  );
});

const StyledTruncatedText = styled.div<{ $lineClamp: number }>`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(p) => p.$lineClamp};
  -webkit-box-orient: vertical;
`;
