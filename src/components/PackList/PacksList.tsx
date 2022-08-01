import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import s from './PackList.module.css'
import { Input, Pagination, PaginationProps } from 'antd'
import { Slider } from 'antd'
import { getPacks } from '../../store-reducers/packs-reducer'


const ButtonsShowMyOrAllPaks = () => {

    return (
        <div className={s.buttonsBlock} >
            <h2>Show packs cards</h2>
            <div>
                <button>My</button>
                <button>All</button>
            </div>
        </div>
    )
}
const NumberOfCards = () => {

    return (
        <div className={s.numberOfCardsBlock} >
            <span>Number of cards</span>
            <div className={s.slider} >

                {/* MouseUp */}
                <Slider range
                    defaultValue={[20, 50]}
                />
            </div>

        </div>
    )
}

const CardsBoard = () => {

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        // onPageChanged(page, pageSize);
    };

    let totalUsersCount = 1230

    return (
        <div className={s.cardsBoardBlock} >
            <h1>Packs list</h1>
            <div className={s.searchInput}>
                {/* debounce */}
                <Input type="search" placeholder='Search...' />
            </div>
            <div className={s.packCardsBlock}  >
                <div className={s.headerPackCards}>
                    <span className={s.name}>Name</span>
                    <span className={s.cards}>Cards</span>
                    <span className={s.updated}>Last Updated</span>
                    <span className={s.createdBy}>Created by </span>
                    <span className={s.actions}>Actions</span>
                </div>
                <div className={s.packCards}>
                    <span className={s.name}>Pack Name</span>
                    <span className={s.cards}>4</span>
                    <span className={s.updated}>21.04.2022</span>
                    <span className={s.createdBy}>Maks KanSder </span>
                    <span className={s.actions}>
                        <button className={s.buttonsDelete}>Delete</button>
                        <button className={s.buttons}>Edit</button>
                        <button className={s.buttons}>Learn</button>
                    </span>
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

const PacksList = () => {

    let dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getPacks())

    }, [])



    return (
        <div className={s.cardsBlock}>
            <div className={s.cardsForm}>
                <ButtonsShowMyOrAllPaks />
                <NumberOfCards />
                <CardsBoard />
            </div>
        </div>
    )
}

export default PacksList