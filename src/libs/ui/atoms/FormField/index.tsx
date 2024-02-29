import { ErrorMessage, Field } from "formik";
import { memo } from "react";
import { StyledFormField, StyledFormFieldWrapper } from "./styles";
import { Text } from "../Text";
import { useTheme } from "styled-components";

interface FormFieldProps {
  name: string;
  type?: "radio" | "password" | "text";
  placeholder?: string;
  value?: string;
  checked?: boolean;
  label?: string;
}

export const FormField = memo((props: FormFieldProps) => {
  const { label } = props;
  const theme = useTheme()

  return (
    <StyledFormFieldWrapper className="form-field">
      {label ? <Text id='field-label' fz={16}>{label}</Text> : null}
      <StyledFormField>
        <Field {...props} id="field" />
      </StyledFormField>
      <ErrorMessage {...props} render={e => <Text fz={14} color={theme.colors.error} id='field-error'>{e}</Text>} />
    </StyledFormFieldWrapper>
  );
});

FormField.displayName = "FormField";
