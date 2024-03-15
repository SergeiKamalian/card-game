import styled from "styled-components";

export const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    margin-top: 20px;
`
export const StyledActions = styled(StyledWrapper)`
    margin: 0;
`