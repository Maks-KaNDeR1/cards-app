

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


export type getPacksDataType = {
    packName?: string, // не обязательно
    min?: number, // не обязательно
    max?: number, // не обязательно
    sortPacks?: string, //"0updated" // не обязательно
    page?: number, // не обязательно
    pageCount?: number, // не обязательно
    user_id?: string,  // чьи колоды не обязательно, или прийдут все
}

