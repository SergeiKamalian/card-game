import { ErrorMessage, Field } from 'formik';
import { memo } from 'react';

interface FormFieldProps {
    name: string;
}

export const FormField = memo((props: FormFieldProps) => {

    return (
        <>
            <Field {...props} />
            <ErrorMessage {...props} render={e => <div>{e}</div>} />
        </>
    );
});

FormField.displayName = 'FormField';