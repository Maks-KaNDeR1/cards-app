import { NavigateFunction } from "react-router-dom";
import { authAPI } from "../../api/cards-api";
import { actionsApp } from "../../app/app-reducer";
import { AppThunk, InferActionsTypes } from "../../app/store";


let initialState = {

};


export type InitialStateType = typeof initialState;
export type AuthActionsType = InferActionsTypes<typeof actions>



export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};


export const actions = {
    setAuthUserData: (
        id: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    ) => ({ type: 'AUTH/SET_USER_DATA', payload: { id, email, login, isAuth } } as const)
}


// export const setAuthUserData = (
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean
// ) =>
//     ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } } as const)


export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
        let { id, email, login } = res.data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}


