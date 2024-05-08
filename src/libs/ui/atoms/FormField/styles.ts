import styled from "styled-components";

export const StyledFormField = styled.div`
  border-radius: 8px;
  width: 95%;
  margin: 0 auto;
  padding: 4px;
  transform: matrix(1, -0.02, -0.04, 1, 0, 0);
  background: ${(p) =>
    `linear-gradient(90deg, ${p.theme.colors.tertiary} 4.17%, ${p.theme.colors.secondary})`};
  box-shadow: 0 5px 15px #07080d, inset 0 0 15px #2e334b;

  > input {
    width: 100%;
    border-radius: 8px;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    font-weight: 600;
    color: white;
    background: ${(p) =>
    `linear-gradient(90deg, ${p.theme.colors.tertiary} 4.17%, ${p.theme.colors.secondary})`};
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
    margin-top: 10px;
    position: relative;
    z-index: 1;
  }

  padding-bottom: 10px;

`;

export const StyledRightIcon = styled.div<{ withLabel: boolean }>`
  position: absolute;

  right: 20px;
  top: ${(p) => (p.withLabel ? "45px" : "5px")};
`;
