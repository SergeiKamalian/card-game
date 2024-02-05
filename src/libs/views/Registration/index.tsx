import { Form, Formik } from 'formik';
import { memo } from 'react';
import { FormField } from '../../ui';

interface RegistrationProps {
    // Define your props here
}

export const Registration = memo((props: RegistrationProps) => {
    return (
        <Formik
            initialValues={{ name: '', password: '' }}
            onSubmit={(v) => console.log(v)}
            validateOnChange={false}
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