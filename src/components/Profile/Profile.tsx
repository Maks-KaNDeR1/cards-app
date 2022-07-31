import React, { ChangeEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATH } from '../../utils/const-enum-path'
import { useAppSelector } from '../../utils/hook'
import ButtonsForForms from '../Auth/common/ButtonsForForms/ButtonsForForms'
import Headlines from '../Auth/common/Headlines/Headlines'
import s from './Profile.module.css'
import profileAvatar from '../../assests/avatar.png'

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
                    {avatar ? avatar : <img src={profileAvatar} alt='' />
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
