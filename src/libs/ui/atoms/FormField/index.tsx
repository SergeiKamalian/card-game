import { ErrorMessage, Field } from "formik";
import { ReactNode, memo } from "react";
import {
  StyledFormField,
  StyledFormFieldWrapper,
  StyledRightIcon,
} from "./styles";
import { Text } from "../Text";
import { useTheme } from "styled-components";

interface FormFieldProps {
  name: string;
  type?: "radio" | "password" | "text";
  placeholder?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  rightIcon?: ReactNode;
  minWidth?: string;
}

export const FormField = memo((props: FormFieldProps) => {
  const { label, minWidth, rightIcon } = props;
  const theme = useTheme();

  return (
    <StyledFormFieldWrapper className="form-field" minWidth={minWidth}>
      {label ? (
        <Text id="field-label" fz={16}>
          {label}
        </Text>
      ) : null}
      <StyledFormField>
        <Field {...props} id="field" />
      </StyledFormField>
      <ErrorMessage
        {...props}
        render={(e) => (
          <Text fz={14} color={theme.colors.error} id="field-error">
            {e}
          </Text>
        )}
      />
      <StyledRightIcon>{rightIcon}</StyledRightIcon>
    </StyledFormFieldWrapper>
  );
});

FormField.displayName = "FormField";
