import { Formik } from "formik";
import { memo, useCallback } from "react";
import { Button, FormField, Text, Wrapper } from "../../ui";
import {
  REGISTRATION_INITIAL_VALUES,
  REGISTRATION_SCHEMA,
} from "../../constants";
import { useAuthorization } from "../../hooks";
import { useTheme } from "styled-components";
import {
  StyledRegistrationButtonWrapper,
  StyledRegistrationForm,
} from "./styles";
import { LuKeyRound } from "react-icons/lu";

interface RegistrationProps {
  setIsRegistrationView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Authorization = memo(
  ({ setIsRegistrationView }: RegistrationProps) => {
    const { registerUser } = useAuthorization();
    const theme = useTheme();
    const goToRegistration = useCallback(
      () => setIsRegistrationView(true),
      [setIsRegistrationView]
    );

    return (
      <Wrapper
        background={theme.gradients.form}
        padding={20}
        direction="column"
        minWidth="450px"
        gap={20}
        withBoxShadow
        borderRadius="30px"
      >
        <Wrapper alignItems="center" gap={10}>
          <LuKeyRound color={theme.colors.white} size={30} />
          <Text color={theme.colors.white} fz={35} fw={600}>
            Authorization
          </Text>
        </Wrapper>
        <Formik
          initialValues={REGISTRATION_INITIAL_VALUES}
          validationSchema={REGISTRATION_SCHEMA}
          onSubmit={(v) => registerUser(v)}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize
        >
          <StyledRegistrationForm>
            <FormField name="name" placeholder="Name" label="Name" />
            <FormField
              name="password"
              placeholder="Password"
              type="password"
              label="Password"
            />
            <StyledRegistrationButtonWrapper>
              <Button size="big" btnType="submit">
                <Text fz={20} fw={500}>
                  Sign in
                </Text>
              </Button>
              <div>
                <Text fz={14}>I don't have an account,</Text>
                <Text
                  fz={14}
                  fw={600}
                  color={theme.colors.link}
                  cursor="pointer"
                  decoration="underline"
                  onClick={goToRegistration}
                >
                  Register
                </Text>
              </div>
            </StyledRegistrationButtonWrapper>
          </StyledRegistrationForm>
        </Formik>
      </Wrapper>
    );
  }
);
