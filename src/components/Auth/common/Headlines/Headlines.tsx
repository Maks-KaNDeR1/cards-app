import React from 'react'
import styles from './Headlines.module.css'

type PropsType = {
    Headlock?: string
    lowerLevel?: string
}

const Headlines: React.FC<PropsType> = ({ Headlock, lowerLevel }) => {
    return (
        <div>
            <div className={styles.Headlock}> It-incubator</div>
            <div className={styles.lowerLevel}> {lowerLevel}</div>
        </div>
    )
}

export default Headlines