import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./store";


let initialState = {
    statusLoading: false,
    error: ''
};

export type InitialStateType = typeof initialState
export type AppActionsType = InferActionsTypes<typeof actionsApp>


const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, statusLoading: action.status }
        case 'APP/ERROR_MESSAGE':
            return { ...state, error: action.error }
        default:
            return state;
    }
}

export const actionsApp = {
    setStatus: (status: boolean) => ({ type: 'APP/SET-STATUS', status } as const),
    errorMessage: (error: string) => ({ type: 'APP/ERROR_MESSAGE', error } as const)
}


export default appReducer;