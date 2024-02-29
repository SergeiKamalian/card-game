import styled from "styled-components";

export const StyledLogo = styled.div<{size: 'normal' | 'large'}>`
    zoom: ${p => p.size === 'large' && 2.5};
    user-select: none;
`