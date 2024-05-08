import styled from "styled-components";

interface WrapperProps {
  $background: string;
  $padding: string;
  $direction: "row" | "column";
  $gap: number;
  $minHeight?: string;
  $minWidth?: string;
  $borderRadius: string;
  $withBoxShadow: boolean;
  $alignItems: string;
  $justifyContent: string;
  $position: string;
  $blur: string;
  $border: string;
}

export const StyledWrapper = styled.div<WrapperProps>`
  background: ${(p) => p.$background};
  border-radius: ${(p) => p.$borderRadius || "none"};
  box-shadow: ${(p) => p.$withBoxShadow && p.theme.shadows.primary};
  backdrop-filter: ${(p) => p.$blur && `blur(${p.$blur})`};
  padding: ${(p) => p.$padding};
  position: ${(p) => p.$position};
  display: flex;
  flex-direction: ${(p) => p.$direction};
  gap: ${(p) => p.$gap && `${p.$gap}px`};
  border: ${(p) => p.$border && `${p.$border}`};
  align-items: ${(p) => p.$alignItems};
  justify-content: ${(p) => p.$justifyContent};
  min-width: ${(p) => p.$minWidth || "auto"};
  min-height: ${(p) => p.$minHeight || "auto"};
  width: fit-content;
`;
