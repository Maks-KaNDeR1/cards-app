import React, { CSSProperties } from 'react'
import s from './ButtonsForForms.module.css'
import MainButton from './MainButton';

type ButtonType = 'submit' | 'reset' | 'button' | undefined;

type PropsType = {
    titleMain: string
    typeMain?: ButtonType
    handleClickMain?: () => void
    styleMain?: CSSProperties
    disabledMain?: boolean

    title: string
    type?: ButtonType
    handleClick?: () => void
    style?: CSSProperties
    disabled?: boolean
}

const ButtonsForForms: React.FC<PropsType> = (
    {
        titleMain,
        typeMain,
        handleClickMain,
        styleMain,
        disabledMain,

        title,
        type,
        handleClick,
        style,
        disabled,
    }
) => {
    return (
        <div>
            <button className={s.cancelButton}
                onClick={handleClick}
                type={type}
            > {title}
            </button>

            <MainButton
                title={titleMain}
                type={typeMain}
                style={styleMain}
                disabled={disabledMain}
                handleClick={handleClickMain}
            />
        </div>
    )
}

export default ButtonsForForms