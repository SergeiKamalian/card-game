import { Form, Formik } from 'formik';
import { memo } from 'react';
import { FormField } from '../../ui';
import { useAuthorization } from '../../hooks';
import { REGISTRATION_INITIAL_VALUES, REGISTRATION_SCHEMA } from '../../constants';

export const Registration = memo(() => {

    const { registerUser } = useAuthorization()

    return (
        <Formik
            initialValues={REGISTRATION_INITIAL_VALUES}
            validationSchema={REGISTRATION_SCHEMA}
            onSubmit={(v) => registerUser(v)}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
        >
            <Form>
                <FormField name='name' />
                <FormField name='password' />
                <button type='submit' >submit</button>
            </Form>
        </Formik>
    );
});

Registration.displayName = 'Registration';