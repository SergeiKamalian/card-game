import styled from "styled-components";

export const StyledRestGamerCardsWrapper = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    margin-top: 3px;
    padding: 5px;
`
export const StyledRestGamerCards = styled.div<{width: number}>`
    position: relative;
    height: 100%;
    width: ${p => `${p.width}px`};
`
export const StyledRestGamerCard = styled.img<{left: number}>`
    height: 100%;
    border: 1px solid rgba(0,0,0,0.2);
    position: absolute;
    top: 0;
    left: ${p => `${p.left}px`};
`