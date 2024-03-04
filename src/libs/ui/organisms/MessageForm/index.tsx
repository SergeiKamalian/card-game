import { memo } from "react";

import styled from "styled-components";

import { Form, Formik } from "formik";
import {
  MESSAGE_FORM_SCHEMA,
  MESSAGE_INITIAL_VALUES,
} from "../../../constants";
import { TMessageRequest } from "../../../types";
import { Button, FormField } from "../../atoms";
import { BsSend } from "react-icons/bs";

interface MessageFormProps {
  onSubmit: (form: TMessageRequest) => void;
}

export const MessageForm = memo((props: MessageFormProps) => {
  const { onSubmit } = props;
  return (
    <Formik
      initialValues={MESSAGE_INITIAL_VALUES}
      validationSchema={MESSAGE_FORM_SCHEMA}
      onSubmit={(v) => onSubmit(v)}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      <Form>
        <StyledMessageForm>
          <FormField name="message" placeholder="Message..." />
          <Button isCircle circleSize={58}>
            <BsSend color="white" size={20} />
          </Button>
        </StyledMessageForm>
      </Form>
    </Formik>
  );
});

const StyledMessageForm = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  min-height: 58px;
  > div {
    width: 100%;
  }
`;
