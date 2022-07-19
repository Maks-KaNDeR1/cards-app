import React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import styles from './ForgotPassword.module.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgot } from '../auth-reducer';
import MainButton from '../common/ButtonsForForms/MainButton';
import Headlines from '../common/Headlines/Headlines';


export const ForgotPassword = () => {

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const validationsSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Обязательно'),
    })

    type SubmitHandlerType = {
        email: string
    }

    const submitHandler = (values: SubmitHandlerType) => {
        dispatch(forgot(values.email, navigate))
        // values.resetForm()
    }

    return (
        <div style={{ justifyContent: 'center' }} >
            <div className={styles.block}>
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    validateOnBlur
                    onSubmit={submitHandler}
                    validationSchema={validationsSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                        <form onSubmit={handleSubmit} className={styles.form}>

                            <Headlines lowerLevel='Forgot your password?' />

                            <p style={{ marginTop: '77px' }}>
                                <label htmlFor={`email`}>Email</label><br />
                                <input
                                    className={'input'}
                                    type={`email`}
                                    name={`email`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </p>
                            {touched.email && errors.email && <p className={styles.error}>{errors.email}</p>}

                            <p className={styles.text} >Enter your email address and we will send you further instructions</p>

                            <div>
                                <MainButton
                                    type={`submit`}
                                    title='Send Instructions'
                                    disabled={!isValid || !dirty}
                                    style={{
                                        opacity: !isValid || !dirty ? '0.5' : '1',
                                        marginLeft: '70px', width: '266px'
                                    }}
                                />
                                <a className={styles.logginLink} href='#/login' > Try logging in </a>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div >
    );
}