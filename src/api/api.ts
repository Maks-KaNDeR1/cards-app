import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})


// api
export const cardsAPI = {



}


export type ResponseDataLoginOrAuthMe = {
    _id: string | null// "62 77c910e473c50a5ce94696"
    email: string | null// "kanderskymaks@gmail.com"
    name: string | null// "kanderskymaks"
    avatar: string | null
    publicCardPacksCount: number | null// 6
    created: string | null// "2022-05-08T13:43:44.171Z"
    isAdmin: boolean | null//false
    rememberMe: boolean | null//false
    token: string | null// "70d22300-10b8-11ed-af3e-430c3f52cfdf"
    updated: string | null// "2022-07-31T10:06:27.121Z"
    verified: boolean | null
    error?: string | null
}

export const authAPI = {
    me() {
        return instance.post<ResponseDataLoginOrAuthMe>('auth/me');
    },
    registration(email: string, password: string) {
        return instance.post('auth/register', { email, password })
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', { email, password, rememberMe })
    },
    logout() {
        return instance.delete('auth/me')
    },
    forgot(email: string) {
        return instance.post('auth/forgot',
            {
                email, from: 'ai73a@yandex.by',
                message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href='http://localhost:3000/#/set-new-password/$token$'>
                link</a>
                </div>`
            })
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post('auth/set-new-password', {
            password,
            resetPasswordToken
        })
    },
}