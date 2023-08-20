/*module */
export type TModule = {
    id: number,
    name: string,
    description: string,
    cardsCount: number
  }

export type TGetModulesResponse = {
    modules: TModule[]
}

export type TCreateModuleResponse = {
    module: TModule
}
export type TCreateModulePayload = {
    name: string,
    description: string
}

export type TMduleSearchParams = {
    by_search: string,
    by_alphabet: string // 'asc' | 'desc'
}

/*user */
export type TRegisterPayload = TLoginPayload
export type TRegisterResponse = TLoginResponse

export type TLoginPayload = {
    email: string,
    password: string
}

export type TLoginResponse ={
    accessToken: string,
    refreshToken: string,
    user: TUser,
}

export type TRefreshTokenResponse = {
    accessToken: string,
    refreshToken: string,
    user: TUser
}

export type TUser = {
    id: number,
    email: string,
    isActivated: boolean,
}