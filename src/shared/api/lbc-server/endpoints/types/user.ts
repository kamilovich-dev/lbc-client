import type { TError } from './error'

/*Логин*/
export type TLoginPayload = {
  email: string,
  password: string
}
export type TLoginResponse ={
  accessToken: string,
  refreshToken: string,
  user: TUser
}
export type TLoginReturn = (TLoginResponse & TError) | undefined

/*Регистрация*/
export type TRegisterPayload = TLoginPayload
export type TRegisterResponse = TLoginResponse
export type TRegisterReturn = (TRegisterResponse & TError) | undefined

/*Обновление токена*/
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
export type TRefreshTokenReturn = (TRefreshTokenResponse & TError) | undefined