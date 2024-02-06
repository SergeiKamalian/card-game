import * as Yup from 'yup';

export const REGISTRATION_SCHEMA = Yup.object().shape({
    name: Yup.string()
        .min(2, 'minimum_2_charts')
        .max(30, 'maximum_30_charts')
        .required('field_is_required'),
    password: Yup.string()
        .min(6, 'minimum_6_charts')
        .max(30, 'maximum_30_charts')
        .required('field_is_required'),
});