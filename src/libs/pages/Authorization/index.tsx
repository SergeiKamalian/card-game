import { Form, Formik } from 'formik';
import { memo } from 'react';
import { REGISTRATION_INITIAL_VALUES, REGISTRATION_SCHEMA } from '../../constants';
import { FormField } from '../../ui';
import { useNavigate } from 'react-router';
import { useAuthorization } from '../../hooks';

export const Authorization = memo(() => {

    const { registerUser } = useAuthorization()

    return (
        <div>
            <Formik
                initialValues={REGISTRATION_INITIAL_VALUES}
                validationSchema={REGISTRATION_SCHEMA}
                onSubmit={v => registerUser(v)}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize
            >
                <Form>
                    <FormField name='name' />
                    <FormField name='password' />
                    <button type='submit'>submit</button>
                </Form>
            </Formik>
        </div>
    );
});