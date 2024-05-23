import styled from "styled-components";

export const StyledSlotActions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
  position: relative;
  z-index: 1;
`;

export const StyledSpinButton = styled.button<{
  size?: "small" | "large";
  active?: boolean;
  isNotButton?: boolean;
}>`
  position: relative;
  top: 0;
  cursor: ${(p) => !p.isNotButton && "pointer"};
  text-decoration: none;
  outline: none;
  font-family: "KnightWarrior", sans-serif;
  font-size: ${(p) => (p.size === "large" ? "50px" : "30px")};
  text-shadow: 2px 2px 1px #0066a2, -2px 2px 1px #0066a2, 2px -2px 1px #0066a2,
    -2px -2px 1px #0066a2, 0px 2px 1px #0066a2, 0px -2px 1px #0066a2,
    0px 4px 1px #004a87, 2px 4px 1px #004a87, -2px 4px 1px #004a87;
  border: none;
  background: repeating-linear-gradient(
    45deg,
    #3ebbf7,
    #3ebbf7 5px,
    #45b1f4 5px,
    #45b1f4 10px
  );
  border-bottom: 3px solid rgba(16, 91, 146, 0.5);
  border-top: 3px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: ${(p) => (p.size === "large" ? "50%" : "20px")};
  padding: 10px 25px;
  box-shadow: 0 6px 0 #266b91, 0 8px 1px 1px rgba(0, 0, 0, 0.3),
    0 10px 0 5px #12517d, 0 12px 0 5px #1a6b9a, 0 15px 0 5px #0c405e,
    0 15px 1px 6px rgba(0, 0, 0, 0.3);
  box-shadow: ${(p) => p.size === "small" && "none"};
  transition: all 0.2s;
  filter: ${(p) => !p.active && "grayScale(0.7)"};
  &:hover {
    transform: ${(p) => p.size !== "small" && "scale(1.05)"};
  }
  &:active {
    transform: ${(p) => !p.isNotButton && "scale(0.95)"};
  }
`;

export const StyledSpinWrapper = styled.div`
  width: 377px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledWinWrapper = styled.div`
  > button {
    font-size: 50px;
    min-width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;
