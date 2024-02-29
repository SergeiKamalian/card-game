import styled from "styled-components";

export const StyledTabItem = styled.button<{active: boolean}>`
    background: none;
    padding: 5px 10px;
    border-bottom: 3px solid ${p => p.active ? p.theme.colors.purple2 : 'transparent'};
    cursor: pointer;
    p {
        transition: all 0.2s;
    }
    &:hover {
        p {
            color: ${p => p.theme.colors.white};
        }
    }
`