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



export const login = (data: any): AppThunk => (dispatch) => {
    //krutilka
    authAPI.login(data)
        .then(res => {
            // dispatch(setIsLoggedIntrue))
            // dispatch(userLogin(res.data))
            // dispatch(logged(true))
            //wikluchaem krutilku
        })
        .catch(err => {
            if (err.response.data.passwordRegExp) {
                dispatch(actionsApp.errorMessage(err.response.data.passwordRegExp))
            } else {
                dispatch(actionsApp.errorMessage(err.response.data.error))
            }
        })
}


export const Logout = (): AppThunk => {

    return (dispatch) => {
        // диспатчим крутилку
        // dispatch(changeStatusLogoutButtonAC(true))
        authAPI.logout()
            .then((res) => {
                // dispatch(loggedAC(false))
            })
            .catch((err) => {
                dispatch(actionsApp.errorMessage("some error"))
            })
            .finally(() => {
                //выключаем крутилку
                // dispatch(changeStatusLogoutButtonAC(false))
            })
    }
}


export const registration = (email: string, password: string): AppThunk => (dispatch) => {
    authAPI.registration(email, password)
        .then(res => {
            // dispatch(loggedAC(true))
        })
        .catch(err => {
            if (err.response.data.passwordRegExp) {
                dispatch(actionsApp.errorMessage(err.response.data.passwordRegExp))
            } else {
                dispatch(actionsApp.errorMessage(err.response.data.error))
            }
        })
}


export const forgot = (email: string, navigate: NavigateFunction): AppThunk => (dispatch) => {
    authAPI.forgot(email)
        .then(res => {
            // dispatch(setEmailAddresUserAC(email))

            navigate('/checkEmail');
            setTimeout(() => {
                navigate('/login')
            }, 5000);
        })
        .catch(err => {
            if (err.response.data.passwordRegExp) {
                dispatch(actionsApp.errorMessage(err.response.data.passwordRegExp))
            } else {
                dispatch(actionsApp.errorMessage(err.response.data.error))
            }
        })
}




export const setNewPassword = (password: string, resetPasswordToken: string): AppThunk => (dispatch) => {
    console.log(password, resetPasswordToken)
    authAPI.setNewPassword(password, resetPasswordToken)
        .then(res => {
            // dispatch(loggedAC(true))
        })
        .catch(err => {
            if (err.response.data.passwordRegExp) {
                dispatch(actionsApp.errorMessage(err.response.data.passwordRegExp))
            } else {
                dispatch(actionsApp.errorMessage(err.response.data.error))
            }
        })
}

