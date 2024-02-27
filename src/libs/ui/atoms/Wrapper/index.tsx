import { FC, ReactNode, memo, useMemo } from "react";
import { useTheme } from "styled-components";
import { StyledWrapper } from "./styles";

interface WrapperProps {
  background?: string;
  padding?: number;
  direction?: "row" | "column";
  gap?: number;
  minWidth?: string;
  minHeight?: string;
  children: ReactNode;
  borderRadius?: string;
  withBoxShadow?: boolean;
  alignItems?: 'center' | 'auto'
}

export const Wrapper: FC<WrapperProps> = memo((props) => {
  const {
    background,
    padding = 10,
    direction = "row",
    gap = 5,
    minHeight,
    minWidth,
    children,
    borderRadius,
    withBoxShadow = false,
    alignItems = 'auto'
  } = props;

  return (
    <StyledWrapper
      $padding={padding}
      $background={background || 'none'}
      $direction={direction}
      $gap={gap}
      $minHeight={minHeight}
      $minWidth={minWidth}
      $borderRadius={borderRadius || 'none'}
      $withBoxShadow={withBoxShadow}
      $alignItems={alignItems}
    >
      {children}
    </StyledWrapper>
  );
});
