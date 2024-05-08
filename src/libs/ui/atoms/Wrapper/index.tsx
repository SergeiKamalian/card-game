import { FC, ReactNode, memo, useMemo } from "react";
import { useTheme } from "styled-components";
import { StyledWrapper } from "./styles";

interface WrapperProps {
  background?: string;
  padding?: string;
  direction?: "row" | "column";
  gap?: number;
  minWidth?: string;
  minHeight?: string;
  children: ReactNode;
  borderRadius?: string;
  withBoxShadow?: boolean;
  alignItems?: "center" | "auto";
  justifyContent?: "center" | "auto" | "flex-end" | "space-between";
  position?: "relative" | "absolute" | "unset";
  blur?: string;
  border?: string;
}

export const Wrapper: FC<WrapperProps> = memo((props) => {
  const {
    background,
    padding = "10px",
    direction = "row",
    gap = 5,
    minHeight,
    minWidth,
    children,
    borderRadius,
    withBoxShadow = false,
    alignItems = "auto",
    justifyContent = "auto",
    position = "unset",
    blur = "",
    border = "",
  } = props;

  return (
    <StyledWrapper
      $padding={padding}
      $background={background || "none"}
      $direction={direction}
      $gap={gap}
      $minHeight={minHeight}
      $minWidth={minWidth}
      $borderRadius={borderRadius || "none"}
      $withBoxShadow={withBoxShadow}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $position={position}
      $blur={blur}
      $border={border}
    >
      {children}
    </StyledWrapper>
  );
});
