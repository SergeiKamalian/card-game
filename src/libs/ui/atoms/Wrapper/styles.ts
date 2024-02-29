import styled from "styled-components";

interface WrapperProps {
    $background: string;
    $padding: string;
    $direction: 'row' | 'column';
    $gap: number;
    $minHeight?: string;
    $minWidth?: string;
    $borderRadius: string;
    $withBoxShadow: boolean;
    $alignItems: string;
    $justifyContent: string;
}

export const StyledWrapper = styled.div<WrapperProps>`
  background: ${p => p.$background};
  border-radius: ${p => p.$borderRadius || 'none'};
  box-shadow: ${p => p.$withBoxShadow && p.theme.shadows.primary};
  padding: ${p => p.$padding};

  display: flex;
  flex-direction: ${p => p.$direction};
  gap: ${p => p.$gap && `${p.$gap}px`};
  align-items: ${p => p.$alignItems};
  justify-content: ${p => p.$justifyContent};
  min-width: ${p => p.$minWidth || 'auto'};
  min-height: ${p => p.$minHeight || 'auto'};
  width: fit-content;
`;
