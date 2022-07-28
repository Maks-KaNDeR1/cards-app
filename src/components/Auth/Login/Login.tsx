import React, { useState } from 'react'
import { Formik } from "formik";
import * as yup from 'yup'
import s from './Login.module.css';
import { Navigate, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hook';
import Headlines from '../common/Headlines/Headlines';
import { login } from '../auth-reducer';
import MainButton from '../common/ButtonsForForms/MainButton';
import { Checkbox } from 'antd';


export const Login = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const [eye, setEye] = useState(true)
    const handleClick = () => {
        if (eye) {
            setEye(false)
        } else {
            setEye(true)
        }
    }

    const validationsSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    })

    type SubmitHandlerType = {
        email: string
        password: string
        remember: false
    }

    const submitHandler = (values: SubmitHandlerType) => {
        const data = (
            values.email,
            values.password,
            values.remember
        )
        dispatch(login(data))
    }

    // if (isAuth) {
    //     return <Navigate to={`/profile`} />
    // }

    return (
        <div className={s.loginBlock}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    remember: false
                }}
                validateOnBlur
                onSubmit={submitHandler}
                validationSchema={validationsSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                    <form onSubmit={handleSubmit} className={s.form}>
                        <Headlines Headlock lowerLevel=' Sign In' />

                        <p style={{ marginTop: '77px' }}>
                            <label className={s.label} htmlFor={`email`}>  Email</label><br />
                            <input
                                className={s.inputField}
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
                                className={s.inputField}
                                // placeholder='Please input your password!'
                                type={eye ? `password` : 'text'}
                                name={`password`}
                                onChange={handleChange}

                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <span className={s.eye} onClick={handleClick}>
                                {
                                    eye ? <i className="fa fa-eye-slash" />
                                        : <i className="fa fa-eye" />
                                }
                            </span>
                        </p>
                        {touched.password && errors.password && <p className={s.error}>{errors.password}</p>}

                        <p style={{ marginTop: '4px' }}>
                            <Checkbox
                                name={`remember`}
                                onChange={handleChange}
                                value={values.remember}
                            >Remember me</Checkbox>
                        </p>
                        <a style={{ marginLeft: '35px' }} href='#/forgot' > forgot password? </a>

                        <MainButton
                            title='Login'
                            style={{ margin: '23px 0 0 70px ', width: '266px' }}
                        />
                        <div className={s.account}>
                            <NavLink to={'/registration'}>Don`t have an account?</NavLink>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}
