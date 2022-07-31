import React, { ChangeEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATH } from '../../utils/const-enum-path'
import { useAppSelector } from '../../utils/hook'
import ButtonsForForms from '../Auth/common/ButtonsForForms/ButtonsForForms'
import Headlines from '../Auth/common/Headlines/Headlines'
import s from './Profile.module.css'

export const Profile = () => {

    const { isAuth, avatar, email, name } = useAppSelector(state => state.auth)
    const navigate = useNavigate()


    const [savePhoto, setSavePhoto] = useState<File>()


    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setSavePhoto(e.target.files[0]);
        }
    }


    const inRef = React.createRef<HTMLInputElement>();

    if (!isAuth) {
        return <Navigate to={PATH.login} />
    }


    return (
        <div className={s.profileBlock}>
            <div className={s.form}>

                <div style={{ marginTop: '36px' }} >
                    <Headlines lowerLevel='Personal Information' />
                </div>

                <div className={s.avatar} >
                    {avatar ? avatar :
                        <img src='data:image/jpeg;base64,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' alt='' />
                    }
                    {
                        <div> <input ref={inRef} type='file'
                            accept=".jpg, .jpeg, .png"
                            style={{ display: 'none' }}
                            onChange={onMainPhotoSelected} />
                            <i onClick={() => inRef && inRef.current?.click()}
                                className="fa fa-camera" aria-hidden="true"></i>
                        </div>
                    }
                </div>


                <p style={{ marginTop: '38px' }}>
                    <label className={s.label} htmlFor={`Nickname`}>Nickname</label><br />
                    <input
                        type={'text'}
                        value={name ? name : ''}
                    />
                </p>

                <p style={{ marginTop: '24px' }}>
                    <label className={s.label} >  Email</label><br />
                    <input
                        type={`email`}
                        name={`email`}
                        value={email ? email : ''}
                    />
                </p>

                <div style={{ marginTop: '34px' }}>

                    <ButtonsForForms
                        titleMain='Save'
                        typeMain='button'

                        title='Cancel'
                        type='button'
                        handleClick={() => navigate(PATH.login)}
                    />
                </div>
            </div>
        </div>
    );
}
