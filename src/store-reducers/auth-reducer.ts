import { NavigateFunction } from "react-router-dom";
import { authAPI } from "../api/api";
import { ResponseDataLoginOrAuthMe } from "../api/types";
import { actionsApp } from "./app-reducer";
import { AppThunk, InferActionsTypes } from "./store";


export type InitialStateType = ResponseDataLoginOrAuthMe & { isAuth: boolean };

let initialState: InitialStateType = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    publicCardPacksCount: null,
    created: null,
    isAdmin: null,
    rememberMe: null,
    token: null,
    updated: null,
    verified: null,
    isAuth: false,
    error: null
};



// export type InitialStateType = typeof initialState;
export type AuthActionsType = InferActionsTypes<typeof actions>


export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
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
        _id: string | null,
        email: string | null,
        name: string | null,
        avatar: string | null,
        publicCardPacksCount: number | null,
        created: string | null,
        isAdmin: boolean | null,
        rememberMe: boolean | null,
        token: string | null,
        updated: string | null,
        verified: boolean | null,
        isAuth: boolean
    ) => ({
        type: 'AUTH/SET_USER_DATA', payload: {
            _id,
            email,
            name,
            avatar,
            publicCardPacksCount,
            created,
            isAdmin,
            rememberMe,
            token,
            updated,
            verified,
            isAuth,
        }
    } as const)
}


export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const res = await authAPI.me();

    console.log('getAuthUserData', res.data);

    // if (res.data.resultCode === 0) {
    let {
        _id,
        email,
        name,
        avatar,
        publicCardPacksCount,
        created,
        isAdmin,
        rememberMe,
        token,
        updated,
        verified,

    } = res.data;
    dispatch(actions.setAuthUserData(_id,
        email,
        name,
        avatar,
        publicCardPacksCount,
        created,
        isAdmin,
        rememberMe,
        token,
        updated,
        verified,
        true));
    // }
}



export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    dispatch(actionsApp.setStatus(true))
    try {
        const res = await authAPI.login(email, password, rememberMe)
        // dispatch(setIsLoggedIntrue))
        // dispatch(userLogin(res.data))
        // dispatch(logged(true))


        console.log('login', res.data);

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

        console.log('logout', res.data);

        if (res.data) {
            dispatch(actions.setAuthUserData(null, null, null, null, null, null, null, null, null, null, null, false))
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

