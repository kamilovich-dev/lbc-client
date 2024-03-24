import type { TError } from './error'

/*Логин*/
export type TLoginPayload = {
  email: string,
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
  isActivated: boolean,
}
export type TRefreshTokenReturn = (TRefreshTokenResponse & TError) | undefined

/*Обновление аватара*/
export type TUpdateAvatarPayload = {
  avatarUrl?: null,
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
  user: TUser
} & TError) | undefined
