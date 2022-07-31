import React from 'react'
import { useAppSelector } from '../../utils/hook'
import s from './CardsPack.module.css'
import profileAvatar from '../../assests/avatar.png'
import { Input, Pagination, PaginationProps } from 'antd'


const Profile = () => {

    const { avatar, name } = useAppSelector(state => state.auth)

    return (
        <div className={s.profileBlock} >
            <img src={avatar ? avatar : profileAvatar} alt='' />
            {/* <h2>{name}</h2> */}
            <h2>Maks</h2>
            <span>Front-end developer</span>
        </div>
    )
}

const NumberOfCards = () => {
    return (
        <div className={s.numberOfCardsBlock} >
            <span>Number of cards</span>
            <div>
                <input type="range" name="" id="" />
            </div>

        </div>
    )
}

const CardsBoard = () => {

    const { name } = useAppSelector(state => state.auth)

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        // onPageChanged(page, pageSize);
    };

    let totalUsersCount = 1230

    return (
        <div className={s.cardsBoardBlock} >
            <h1>Packs list Maks’s</h1>
            {/* <h1>Packs list {name}’s</h1> */}
            <div className={s.searchInput}>
                <Input type="search" placeholder='Search...' />

            </div>
            {/* <input type="search" placeholder='Search...' name="" id="" /> */}
            <div className={s.packCardsBlock}  >
                <div className={s.headerPackCards}>
                    Name Cards Last Updated Created by Actions
                </div>
                <div className={s.packCards}>
                    pack name 6 fg;lk df;gk
                </div>
            </div>
            <div className={s.pagination} >
                <Pagination
                    // showQuickJumper
                    onChange={onChange}
                    // style={{ width: '500px' }}
                    size={'small'}
                    showSizeChanger
                    defaultCurrent={1}
                    total={totalUsersCount}
                    defaultPageSize={10}
                    pageSizeOptions={[10, 20, 30]}
                />
                {/* Cards per Page */}
            </div>

        </div>
    )
}




const CardsPack = () => {


    return (
        <div className={s.cardsBlock}>
            <div className={s.cardsForm}>
                <Profile />
                <NumberOfCards />
                <CardsBoard />
            </div>
        </div>
    )
}

export default CardsPack