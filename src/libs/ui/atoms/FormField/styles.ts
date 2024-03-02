import styled from "styled-components";

export const StyledFormField = styled.div`
  border-radius: 30px;
  background: ${(p) => p.theme.colors.formBg};
  width: 100%;
  padding: 4px;
  
  > input {
    width: 100%;
    border-radius: 30px;
    height: 50px;
    padding-left: 20px;
    font-weight: 600;
    background: ${(p) => p.theme.colors.white};
    color: ${(p) => p.theme.colors.secondary};
    box-shadow: ${(p) =>
      `2px 13px 71px -33px ${p.theme.colors.secondary} inset`};
  }
`;

export const StyledFormFieldWrapper = styled.div<{ minWidth?: string }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: ${(p) => p.minWidth || "auto"};
  
  position: relative;
  #field-label {
    margin-left: 10px;
  }

  #field-error {
    margin-left: 10px;
  }
`;

export const StyledRightIcon = styled.div`
  position: absolute;
  
  right: 20px;
  top: 45px;
`
