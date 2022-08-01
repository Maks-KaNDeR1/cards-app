import { authReducer } from './auth-reducer';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import appReducer, { AppActionsType } from './app-reducer';
import { AuthActionsType } from './auth-reducer';
import { PacksActionsType, packsReducer } from './packs-reducer';

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packs: packsReducer
    // favoritesCats: FavoritesCatsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

type AppRootActionsType = AppActionsType | AuthActionsType | PacksActionsType

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store
