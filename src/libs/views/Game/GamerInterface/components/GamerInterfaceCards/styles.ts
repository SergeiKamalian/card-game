import styled from "styled-components";

export const StyledGamerInterfaceCards = styled.div<{width: number}>`
    max-width: 1000px;
    width: ${p => `${p.width}px`};
    height: 95%;
    transform: translateY(50px);
    display: flex;
    position: relative;
    zoom: 1.2;
`
export const StyledCardWrapper = styled.div<{transform: string, left: number} >`
    transform: ${p => p.transform};
    position: absolute;
    left: ${p => `${p.left}px`};
`