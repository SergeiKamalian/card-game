import styled from "styled-components";

export const StyledTabItem = styled.button<{ active: boolean }>`
    background: none;
    padding: 5px 10px;
    border-bottom: 3px solid ${p => p.active ? p.theme.colors.purple2 : 'transparent'};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    p, div {
        transition: all 0.2s;
    }
    &:hover {
        p {
            color: ${p => p.theme.colors.white};
        }

        >div {
            color: ${p => p.theme.colors.white};
            border-color: ${p => p.theme.colors.white};
        }
    }
`
export const StyledBadge = styled.div<{ active: boolean }>`
    border: 1px solid ${p => p.active ? p.theme.colors.white : p.theme.colors.purpleLight};
    color: ${p => p.active ? p.theme.colors.white : p.theme.colors.purpleLight};
    border-radius: 5px;
    padding: 3px 10px;
    font-size: 13px;
`