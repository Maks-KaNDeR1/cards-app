import React from 'react'
import styles from './CheckEmail.module.css'
import { CheckEmailIcons } from './CheckEmailIcons';
import { useAppSelector } from '../../../../utils/hook';
import Headlines from '../../common/Headlines/Headlines';


export function CheckEmail() {

  // const email = useAppSelector(state => state.auth)

  let email = 'MaksKaNDeR'

  return (
    <div>
      <div className={styles.block}>
        <div className={styles.form}>
          <Headlines />
          <div className={styles.itemSvg} >
            <CheckEmailIcons />
          </div>
          <div className={styles.checkEmail}> Check Emael</div>

          <div className={styles.text} >
            We’ve sent an Email with instructions to {email}
          </div>
        </div>
      </div>
    </div>
  )
}


















