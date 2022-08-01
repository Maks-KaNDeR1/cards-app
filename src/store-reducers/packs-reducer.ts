import { cardsAPI } from "../api/api";
import { getPacksDataType } from "../api/types";
import { actionsApp } from "./app-reducer";
import { AppRootStateType, AppThunk, InferActionsTypes } from "./store";


let initialState = {
    packList: [] as getPacksDataType,
    //  cardPacksTotalCount: 14,
    maxCardsCount: 10,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}

type InitialStateType = typeof initialState
export type PacksActionsType = InferActionsTypes<typeof actionsPaks>



export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case 'PL/SET-PACKS':
            return { ...state, ...action.data }
        default:
            return state;
    }
};



export const actionsPaks = {

    setPacks: (data: any) => ({ type: 'PL/SET-PACKS', data } as const),

}

export const getPacks = (): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    dispatch(actionsApp.setStatus(true))
    let params = getState().packs

    try {
        const res = await cardsAPI.getPacks(params)
        console.log(params)

        dispatch(actionsPaks.setPacks(res.data))
    }
    catch (err) {
        // dispatch(errorMessageAC("some error"))
    }
    finally {
        dispatch(actionsApp.setStatus(false))
    }
}
