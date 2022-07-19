import { authReducer } from './../components/Auth/auth-reducer';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import appReducer, { AppActionsType } from './app-reducer';
import { AuthActionsType } from '../components/Auth/auth-reducer';

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer
    // cats: catsReducer,
    // favoritesCats: FavoritesCatsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

type AppRootActionsType = AppActionsType | AuthActionsType

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store
