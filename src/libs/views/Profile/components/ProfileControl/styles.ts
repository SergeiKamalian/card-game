import styled from "styled-components";

export const StyledProfileControl = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    background: ${p => p.theme.gradients.form};
    box-shadow: ${p => p.theme.shadows.primary};
    display: flex;
    align-items: center;
    padding: 20px 50px;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-radius: 50px 50px 0 0;
    justify-content: space-between;
`
export const StyledLogoWrapper = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`