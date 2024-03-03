import styled from "styled-components";

export const StyledGamerInterfaceCards = styled.div<{width: number}>`
    max-width: 1000px;
    width: ${p => `${p.width}px`};
    height: 95%;
    transform: translateY(50px);
    display: flex;
`