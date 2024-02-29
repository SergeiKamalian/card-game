import { Form, Formik } from "formik";
import { memo } from "react";
import {
  GAME_JOINING_INITIAL_VALUES,
  GAME_JOINING_SCHEMA,
} from "../../../../../../../../constants";
import { useGameConnection } from "../../../../../../../../hooks/useGameConnection";
import { Button, FormField, Text, Wrapper } from "../../../../../../../../ui";

export const JoinGame = memo(() => {
  const { joinToGame } = useGameConnection();

  return (
    <Formik
      initialValues={GAME_JOINING_INITIAL_VALUES}
      validationSchema={GAME_JOINING_SCHEMA}
      onSubmit={joinToGame}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      <Form>
        <Wrapper direction="column" padding="30px 10px 0 10px" minWidth="100%" gap={30}>
          <FormField name="code" label="Game code" placeholder="123456" />
          <Button>
                <Text fz={18} fw={500} cursor="pointer">
                  Join to game
                </Text>
              </Button>
        </Wrapper>
      </Form>
    </Formik>
  );
});
