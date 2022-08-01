import React from 'react'
import s from 'Header.module.css'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../utils/const-enum-path'
import { useAppDispatch } from '../../utils/hook'
import { logout } from '../../store-reducers/auth-reducer'


export const Header = () => {


    const dispatch = useAppDispatch()
    const onClickHandler = () => dispatch(logout());

    const setActive = (navData: any) => ({
        borderBottom: navData.isActive ? '0.15vw solid #21268F' : '',
        backgroundColor: navData.isActive ? '#DCCCDB' : '',
        width: '50%',
        height: '100%',
    });

    return (
        <header className={s.header}>
            <p>it-incubator</p>
            <div>
                <NavLink to={PATH.cardsPack}
                    style={setActive}>
                    Pack list
                </NavLink>
                <NavLink to={PATH.profile}
                    style={setActive}>
                    Profile
                </NavLink>
            </div>
            <button onClick={onClickHandler}>LogOut</button>
        </header>
    )
}

export default Header