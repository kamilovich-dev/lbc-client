import type { TError } from './error'

/*Получение данных пользователя*/
export type TGetUserResponse = {
  user?: TUser
}

export type TGetUserReturn = (TGetUserResponse & TError) | undefined

/*Логин*/
export type TLoginPayload = {
  email?: string,
  login?: string,
  password: string
}
export type TLoginResponse ={
  accessToken: string,
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
  user: TUser
}
export type TUser = {
  id: number,
  email: string,
  login: string,
  isActivated: boolean,
  avatarUrl: string,
}
export type TRefreshTokenReturn = (TRefreshTokenResponse & TError) | undefined

/*Обновление аватара*/
export type TUpdateAvatarPayload = {
  avatarUrl?: '',
  avatarFile?: File
}
export type TUpdateAvatarReturn = ({
  success: boolean,
  message: string,
} & TError) | undefined

/*Восстановление пароля*/
export type TPasswordForgotPayload = {
  login?: string,
  email?: string,
}
export type TPasswordForgotReturn = ({
  success: boolean,
  message: string,
} & TError) | undefined

/*Сброс пароля*/
export type TPasswordResetPayload = {
  email: string,
  password: string,
  token: string,
}
export type TPasswordResetReturn = ({
  success: boolean,
  message: string,
} & TError) | undefined
