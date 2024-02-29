import styled from "styled-components";

export const StyledLabel = styled.label`
  position: relative;
  cursor: pointer;
  .form-field {
    background: red;
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
    > div {
      padding: 0;
    }
  }
`;
export const StyledRadio = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 5px solid
    ${(p) => (p.checked ? p.theme.colors.white : p.theme.colors.purpleLight)};
  border-radius: 50%;
  transition: all 0.2s;
  cursor: pointer;

  > div {
    opacity: ${(p) => (p.checked ? 1 : 0)};
  }
`;

export const StyledRadioInner = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.white};
  border-radius: 50%;
  transition: all 0.2s;
`;
