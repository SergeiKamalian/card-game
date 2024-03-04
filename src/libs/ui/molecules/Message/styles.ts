import styled from "styled-components";

export const StyledMessage = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    
    img {
        min-width: 50px;
        border: 1px solid rgba(255,255,255,0.3);
    }

    >div {
        width: 100%;
    }
`