import { NavigateFunction } from "react-router-dom";
import { authAPI } from "../../api/cards-api";
import { actionsApp } from "../../app/app-reducer";
import { AppThunk, InferActionsTypes } from "../../app/store";


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};


// export type InitialStateType = typeof initialState;
export type AuthActionsType = InferActionsTypes<typeof actions>

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}


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


export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const res = await authAPI.me();

    console.log('getAuthUserData', res);

    // if (res.data.resultCode === 0) {
    let { id, email, login } = res.data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
    // }
}



export const login = (data: any): AppThunk => async (dispatch) => {
    dispatch(actionsApp.setStatus(true))
    try {
        const res = await authAPI.login(data)
        // dispatch(setIsLoggedIntrue))
        // dispatch(userLogin(res.data))
        // dispatch(logged(true))


        console.log('login', res);

        if (res.data) {
            dispatch(getAuthUserData())
        }
    }
    catch (err: any) {
        if (err.response.data.passwordRegExp) {
            dispatch(actionsApp.errorMessage(err.response.data.passwordRegExp))
        } else {
            dispatch(actionsApp.errorMessage(err.response.data.error))
        }
    }
    finally {
        dispatch(actionsApp.setStatus(false))
    }

}


export const logout = (): AppThunk => async (dispatch) => {

    dispatch(actionsApp.setStatus(true))
    try {
        const res = await authAPI.logout()
        // dispatch(loggedAC(false))

        console.log('logout', res);

        if (res.data) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
    }
    catch (err) {
        dispatch(actionsApp.errorMessage("some error"))
    }
    finally {
        dispatch(actionsApp.setStatus(false))
    }
}


export const registration = (email: string, password: string): AppThunk => async (dispatch) => {

    dispatch(actionsApp.setStatus(true))
    try {
        const res = await authAPI.registration(email, password)
        // dispatch(loggedAC(true))
    }
    catch (err: any) {
        if (err.response.data.passwordRegExp) {
            dispatch(actionsApp.errorMessage(err.response.data.passwordRegExp))
        } else {
            dispatch(actionsApp.errorMessage(err.response.data.error))
        }
    }
    finally {
        dispatch(actionsApp.setStatus(false))
    }
}


export const forgot = (email: string, navigate: NavigateFunction): AppThunk => async (dispatch) => {

    dispatch(actionsApp.setStatus(true))
    try {
        const res = await authAPI.forgot(email)
        // dispatch(setEmailAddresUserAC(email))

        navigate('/checkEmail');
        setTimeout(() => {
            navigate('/login')
        }, 5000);
    }
    catch (err: any) {
        if (err.response.data.passwordRegExp) {
            dispatch(actionsApp.errorMessage(err.response.data.passwordRegExp))
        } else {
            dispatch(actionsApp.errorMessage(err.response.data.error))
        }
    }
    finally {
        dispatch(actionsApp.setStatus(false))
    }
}




export const setNewPassword = (password: string, resetPasswordToken: string): AppThunk => async (dispatch) => {

    dispatch(actionsApp.setStatus(true))
    try {
        const res = await authAPI.setNewPassword(password, resetPasswordToken)
        // dispatch(loggedAC(true))
    }
    catch (err: any) {
        if (err.response.data.passwordRegExp) {
            dispatch(actionsApp.errorMessage(err.response.data.passwordRegExp))
        } else {
            dispatch(actionsApp.errorMessage(err.response.data.error))
        }
    }
    finally {
        dispatch(actionsApp.setStatus(false))
    }
}

