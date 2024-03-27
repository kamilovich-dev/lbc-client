import { Client } from '../model/Client'
import { request } from './request'

import { TError } from './types/error'

import type {
  TGetUserReturn,

  TLoginPayload,
  TLoginReturn,
  TRegisterPayload,
  TRegisterReturn,
  TRefreshTokenReturn,

  TUpdateAvatarPayload,
  TUpdateAvatarReturn,

  TPasswordForgotPayload,
  TPasswordForgotReturn,

  TPasswordResetPayload,
  TPasswordResetReturn
} from './types/user'

export async function login(client: Client, payload: TLoginPayload): Promise<TLoginReturn> {
  return request(client, 'post', '/user/login', payload)
}

export async function logout(client: Client): Promise<void | TError | undefined> {
  return request(client, 'post', '/user/logout', {})
}

export async function register(client: Client, payload: TRegisterPayload): Promise<TRegisterReturn> {
  return request(client, 'post', '/user/registration', payload)
}

export async function refreshToken(client: Client): Promise<TRefreshTokenReturn> {
  return request(client, 'get', '/user/refresh-token')
}

/*Новые*/
export async function updateAvatar(client: Client, payload: TUpdateAvatarPayload): Promise<TUpdateAvatarReturn> {
  return request(client, 'post', '/user/update-avatar', payload)
}

export async function passwordForgot(client: Client, payload: TPasswordForgotPayload): Promise<TPasswordForgotReturn> {
  return request(client, 'post', '/user/password-forgot', payload)
}

export async function passwordReset(client: Client, payload: TPasswordResetPayload): Promise<TPasswordResetReturn> {
  return request(client, 'post', '/user/password-reset', payload)
}

export async function getUser(client: Client): Promise<TGetUserReturn> {
  return request(client, 'get', '/user')
}
