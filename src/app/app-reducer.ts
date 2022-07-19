import { InferActionsTypes } from "./store";


let initialState = {
    initialized: false,
    statusLoading: false,
    error: ''
};

export type InitialStateType = typeof initialState
export type AppActionsType = InferActionsTypes<typeof actionsApp>


const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return { ...state, initialized: true }
        case 'APP/SET-STATUS':
            return { ...state, statusLoading: action.status }
        case 'APP/ERROR_MESSAGE':
            return { ...state, error: action.error }
        default:
            return state;
    }
}

export const actionsApp = {
    initializedSuccess: () => ({ type: 'APP/INITIALIZED_SUCCESS' } as const),
    setStatus: (status: boolean) => ({ type: 'APP/SET-STATUS', status } as const),
    errorMessage: (error: string) => ({ type: 'APP/ERROR_MESSAGE', error } as const)
}


export const initializeApp = () => (dispatch: any) => {
    let promise = 2
    // dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(actionsApp.initializedSuccess());
        });
}


export default appReducer;