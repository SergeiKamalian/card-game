import styled from "styled-components";

export const StyledChatComponent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
`
export const StyledChatMessages = styled.div`
    max-height: 300px;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
`