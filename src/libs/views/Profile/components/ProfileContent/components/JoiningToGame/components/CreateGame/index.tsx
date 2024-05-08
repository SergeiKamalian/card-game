import { Form, Formik } from "formik";
import { memo } from "react";
import {
  CREATE_GAME_PRIVATE_VARIANTS,
  GAME_CREATING_INITIAL_VALUES,
  GAME_CREATING_SCHEMA,
} from "../../../../../../../../constants";
import {
  Button,
  FormField,
  Text,
  VariationSelect,
  Wrapper,
} from "../../../../../../../../ui";
import { useGameConnection } from "../../../../../../../../hooks/useGameConnection";

export const CreateGame = memo(() => {
  const { createGame } = useGameConnection();

  return (
    <Formik
      initialValues={GAME_CREATING_INITIAL_VALUES}
      validationSchema={GAME_CREATING_SCHEMA}
      onSubmit={createGame}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({ values }) => {
        return (
          <Form>
            <Wrapper direction="column" padding="10px 0 0" minWidth="100%" gap={10}>
              <Wrapper direction="column">
                <Wrapper padding="0">
                  <FormField name="gamersCount" label="Gamers" />
                  <FormField name="coins" label="Coins" />
                </Wrapper>
                <VariationSelect
                  name="private"
                  variations={CREATE_GAME_PRIVATE_VARIANTS}
                  checked={values.private}
                  label="Private"
                />
              </Wrapper>
              <Button>
                <Text fz={18} fw={500} cursor="pointer">
                  Create a game
                </Text>
              </Button>
            </Wrapper>
          </Form>
        );
      }}
    </Formik>
  );
});
