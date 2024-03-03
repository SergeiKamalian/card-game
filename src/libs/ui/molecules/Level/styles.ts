import styled from "styled-components";

export const StyledLevel = styled.div`
    position: relative;
`
export const StyledLevelImage = styled.img`
    object-fit: cover;
    height: 30px;
    filter: drop-shadow(5px 5px 5px #222);
`
export const StyledLevelWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    p {
        color: black;
        font-size: 14px;
    }
`