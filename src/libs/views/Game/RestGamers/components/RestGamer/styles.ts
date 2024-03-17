import styled from "styled-components";

export const StyledRestGamer = styled.div<{
  disabled: boolean;
  isInvite: boolean;
}>`
  width: 140px;
  height: 100%;
  min-height: 149px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 9px 16px 20px -12px black;
  position: relative;
  cursor: ${(p) => p.isInvite && "pointer"};
  
  &:hover {
    .inviteWrapper {
      path {
        color: ${p => p.theme.colors.white};
      }
    }
  }
  /* overflow: hidden; */
  /* opacity: ${(p) => p.disabled && "0.3"}; */
`;
export const StyledNameWrapper = styled.div<{ isStartingView: boolean }>`
  position: absolute;
  top: 120px;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: ${(p) => p.isStartingView && "10px"};
  border-bottom-right-radius: ${(p) => p.isStartingView && "10px"};
`;
export const StyledLevelWrapper = styled.div<{ isStartingView: boolean }>`
  position: absolute;
  bottom: ${(p) => (!p.isStartingView ? "67px" : "15px")};
  left: 50%;
  transform: translateX(-50%);
`;
export const StyledDisconnectWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledInviteWrapper = styled.div`
  height: 149px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;

  path {
    transition: all 0.2s;
  }
`;
