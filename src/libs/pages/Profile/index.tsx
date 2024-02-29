import { Form, Formik } from 'formik';
import { memo, useEffect } from 'react';
import { FormField } from '../../ui';
import { GAME_CREATING_INITIAL_VALUES, GAME_CREATING_SCHEMA, GAME_JOINING_INITIAL_VALUES, GAME_JOINING_SCHEMA } from '../../constants';
import { useGameConnection } from '../../hooks/useGameConnection';
import { useAppInitialization } from '../../hooks';
import { useAppContext } from '../../contexts';
import { ProfileComponent } from '../../views';

export const Profile = memo(() => {

    const { createGame, joinToGame } = useGameConnection()
    const { cards, initializeApplication } = useAppContext()

    useEffect(() => {
        initializeApplication()
    }, [initializeApplication])

    return <ProfileComponent />

    return (
        <div>
            <Formik
                initialValues={GAME_CREATING_INITIAL_VALUES}
                validationSchema={GAME_CREATING_SCHEMA}
                onSubmit={v => createGame(v)}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize
            >
                <Form>
                    <FormField name='gamersCount' />
                    <FormField name='coins' />
                    <div>
                        <label>
                            <FormField name='private' type='radio' value='true' checked />
                            true
                        </label>
                        <label>
                            <FormField name='private' type='radio' value='false' />
                            false
                        </label>
                    </div>
                    <button type='submit'>submit</button>
                </Form>
            </Formik>
            <Formik
                initialValues={GAME_JOINING_INITIAL_VALUES}
                validationSchema={GAME_JOINING_SCHEMA}
                onSubmit={v => joinToGame(v)}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize
            >
                <Form>
                    <FormField name='code' />
                    <button type='submit'>submit</button>
                </Form>
            </Formik>
        </div>
    );
});