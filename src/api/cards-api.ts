import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})


// api
export const cardsAPI = {



}



export const authAPI = {
    me() {
        return instance.post('auth/me', {});
    },
    registration(email: string, password: string) {
        return instance.post('auth/registration', { email, password })
    },
    // login(email: string, password: string, rememberMe: boolean) {
    // return instance.post(`auth/login`, { email, password, rememberMe })
    login(data: any) {
        return instance.post(`auth/login`, { data })
    },
    logout() {
        return instance.delete(`auth/me`, {})
    },
    forgot(email: string) {
        return instance.post(`auth/forgot`,
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
        return instance.post(`auth/set-new-password`, {
            password,
            resetPasswordToken
        })
    },
}