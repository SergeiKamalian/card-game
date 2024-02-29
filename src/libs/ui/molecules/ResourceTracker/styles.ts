import styled from "styled-components";

export const StyledResourceTracker = styled.div`
    min-width: 130px;
    width: fit-content;
    height: 50px;
    border-radius: 50px;
    background: ${p => p.theme.gradients.form};
    box-shadow: ${p => p.theme.shadows.primary};
    padding: 5px;
    padding-left: 75px;
    position: relative;

    >img {
        position: absolute;
        left: 0;
        top: -5px;
    }
`