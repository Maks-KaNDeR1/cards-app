import { CardsResponseType, OneCardType, ParamsCardsType } from "../types/CardType";


export type CardsInitialStateType = CardsResponseType;

const initialState: CardsInitialStateType = {
    cards: [] as OneCardType[],
    cardsTotalCount: 0,
    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '62850a120cf3a40004dfa336',
        min: 0,
        max: 5,
        sortCards: '0grade',
        page: 1,
        pageCount: 10,
    } as ParamsCardsType,
    isFetching: false,
    packUserId: '62850a120cf3a40004dfa336'
};

export const authReducer = (state = initialState, action: any): CardsInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
            return {
                ...state,
            }
        default:
            return state;
    }
};