import React, { useState } from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import s from './Registration.module.css'
import { registration } from '../../../store-reducers/auth-reducer';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hook';
import Headlines from '../common/Headlines/Headlines';
import ButtonsForForms from '../common/ButtonsForForms/ButtonsForForms';
import { PATH } from '../../../utils/const-enum-path';

export const Registration = () => {

    const isLoggedIn = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const [eyeConfirm, setEyeConfirm] = useState(true)
    const [eye, setEye] = useState(true)
    const handleClick = () => {
        if (eye) setEye(false)
        else setEye(true)
    }
    const handleClickConfirm = () => {
        if (eyeConfirm) setEyeConfirm(false)
        else setEyeConfirm(true)
    }


    const validationsSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательно'),
    })

    type SubmitHandlerType = {
        email: string
        password: string
        confirmPassword: string
    }

    const submitHandler = (values: SubmitHandlerType) => {
        dispatch(registration(values.email, values.password))
    }


    // if (isLoggedIn) {
    //     return <Navigate to={`/profile`} />
    // }

    return (
        <div className={s.registrationBlock}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validateOnBlur
                onSubmit={submitHandler}
                validationSchema={validationsSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                    <form onSubmit={handleSubmit} className={s.form}>

                        <Headlines Headlock lowerLevel=' Sign Up' />

                        <p style={{ marginTop: '77px' }}>
                            <label className={s.label} htmlFor={`email`}>  Email</label><br />
                            <input
                                // placeholder='Please input your email!'
                                type={`email`}
                                name={`email`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                        </p>
                        {touched.email && errors.email && <p className={s.error}>{errors.email}</p>}

                        <p style={{ marginTop: '24px' }}>
                            <label className={s.label} htmlFor={`secondName`}>password</label><br />
                            <input
                                // placeholder='Please input your password!'
                                type={eye ? `password` : 'text'}
                                name={`password`}
                                onChange={handleChange}

                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <span className={s.eye} onClick={handleClick}>
                                {
                                    eye ? <i className="fa fa-eye" />
                                        : <i className="fa fa-eye-slash" />
                                }
                            </span>
                        </p>
                        {touched.password && errors.password && <p className={s.error}>{errors.password}</p>}

                        <p style={{ marginTop: '24px' }}>
                            <label className={s.label} htmlFor={`confirmPassword`}>Confirm password</label><br />
                            <input
                                // placeholder='Please input repeated your password!'
                                type={eyeConfirm ? `password` : 'text'}
                                name={`confirmPassword`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                            />
                            <span className={s.eye} onClick={handleClickConfirm}>
                                {
                                    eyeConfirm ? <i className="fa fa-eye" />
                                        : <i className="fa fa-eye-slash" />
                                }
                            </span>
                        </p>
                        {touched.confirmPassword && errors.confirmPassword &&
                            <p className={s.error}>{errors.confirmPassword}</p>}

                        <ButtonsForForms
                            titleMain='Register'
                            typeMain='submit'
                            styleMain={{ opacity: !isValid || !dirty ? '0.5' : '1' }}
                            disabledMain={!isValid || !dirty}

                            title='Cancel'
                            type='button'
                            handleClick={() => navigate(PATH.login)}
                        />
                    </form>
                )}
            </Formik>
        </div>
    );
}

