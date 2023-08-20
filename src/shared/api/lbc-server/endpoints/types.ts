/*module */
export type TModule = {
    id: number,
    name: string,
    description: string,
  }

export type TGetModulesResponse = {
    modules: TModule[]
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

/*error */
export type TApiError = {
    status: number | undefined,
    message: string,
}