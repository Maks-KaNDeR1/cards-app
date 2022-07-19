import React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import styles from './CreateNewPassword.module.css'
import { useParams } from 'react-router-dom';
import { setNewPassword } from '../auth-reducer';
import Headlines from '../common/Headlines/Headlines';
import MainButton from '../common/ButtonsForForms/MainButton';
import { useAppDispatch } from '../../../utils/hook';


export const CreateNewPassword = () => {

    const dispatch = useAppDispatch()
    const { token } = useParams<{ token: string }>()

    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    })


    type SubmitHandlerType = {
        password: string
    }

    const submitHandler = (values: SubmitHandlerType) => {
        if (token)
            dispatch(setNewPassword(values.password, token))
    }

    return (
        <div style={{ justifyContent: 'center' }}>
            <div className={styles.block}>
                <Formik
                    initialValues={{
                        password: '',
                    }}
                    validateOnBlur
                    onSubmit={submitHandler}
                    validationSchema={validationsSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                        <form onSubmit={handleSubmit} className={styles.form}>

                            <Headlines lowerLevel='Create new password' />

                            <p style={{ marginTop: '77px' }}>
                                <label htmlFor={`secondName`}>password</label><br />
                                <input
                                    className={'input'}
                                    name={`password`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </p>
                            {touched.password && errors.password && <p className={styles.error}>{errors.password}</p>}

                            <div>
                                <MainButton
                                    type={`submit`}
                                    title='Create New Password'
                                    disabled={!isValid || !dirty}
                                    style={{
                                        opacity: !isValid || !dirty ? '0.5' : '1',
                                        margin: '162px 0 0 70px', width: '266px'
                                    }}
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

