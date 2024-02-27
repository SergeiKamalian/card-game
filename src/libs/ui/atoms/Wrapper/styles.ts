import styled from "styled-components";

interface WrapperProps {
    $background: string;
    $padding: number;
    $direction: 'row' | 'column';
    $gap: number;
    $minHeight?: string;
    $minWidth?: string;
    $borderRadius: string;
    $withBoxShadow: boolean;
    $alignItems: string;
}

export const StyledWrapper = styled.div<WrapperProps>`
  background: ${p => p.$background};
  border-radius: ${p => p.$borderRadius || 'none'};
  box-shadow: ${p => p.$withBoxShadow && p.theme.shadows.primary};
  padding: ${p => `${p.$padding}px`};

  display: flex;
  flex-direction: ${p => p.$direction};
  gap: ${p => p.$gap && `${p.$gap}px`};
  align-items: ${p => p.$alignItems};
  min-width: ${p => p.$minWidth || 'auto'};
  min-height: ${p => p.$minHeight || 'auto'};
`;
