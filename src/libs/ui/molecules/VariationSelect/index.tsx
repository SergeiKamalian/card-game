import { memo } from "react";
import { FormField, Text, Wrapper } from "../../atoms";
import { StyledLabel, StyledRadio, StyledRadioInner } from "./styles";
import { useTheme } from "styled-components";

export interface IVariation {
  id: number;
  value: string;
  label: string;
}

interface VariationSelectProps {
  name: string;
  variations: IVariation[];
  checked: string;
  label?: string;
}

export const VariationSelect = memo((props: VariationSelectProps) => {
  const { name, variations, checked, label } = props;
  const theme = useTheme();
  return (
    <Wrapper gap={7} direction="column">
      {label ? (
        <Text id="field-label" fz={16}>
          {label}
        </Text>
      ) : null}
      <Wrapper gap={30} padding="0">
        {variations.map((variant) => (
          <StyledLabel key={variant.id}>
            <FormField name={name} type="radio" value={variant.value} />
            <Wrapper padding="0" gap={10} alignItems="center">
              <StyledRadio checked={variant.value === checked}>
                <StyledRadioInner />
              </StyledRadio>
              <Text
                color={variant.value !== checked && theme.colors.purpleLight}
                cursor="pointer"
              >
                {variant.label}
              </Text>
            </Wrapper>
          </StyledLabel>
        ))}
      </Wrapper>
    </Wrapper>
  );
});
