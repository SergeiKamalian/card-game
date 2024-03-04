import styled from "styled-components";

export const StyledTrackers = styled.div`
    width: 100%;
    height: 100px;
    padding: 40px 50px 0;
    display: flex;
    justify-content: space-between;
`
export const StyledLogoutButton = styled.button`
    width: 50px;
    height: 50px;
    background: ${p => p.theme.colors.error};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px ${p => p.theme.colors.error};
    transition: all 0.1s;
    &:hover {
        box-shadow: 0 0 30px ${p => p.theme.colors.error};
    }
`