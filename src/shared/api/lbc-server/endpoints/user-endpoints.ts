import { Client } from '../model/Client'
import { request } from './request'

import type {
  TLoginPayload,
  TLoginReturn,
  TRegisterPayload,
  TRegisterReturn,
  TRefreshTokenReturn
} from './types/user'

export async function login(client: Client, payload: TLoginPayload): Promise<TLoginReturn> {
  return request(client, 'post', '/user/login', payload)
}

export async function logout(client: Client): Promise<void> {
  return request(client, 'post', '/user/logout', {})
}

export async function register(client: Client, payload: TRegisterPayload): Promise<TRegisterReturn> {
  return request(client, 'post', '/user/registration', payload)
}

export async function refreshToken(client: Client): Promise<TRefreshTokenReturn> {
  return request(client, 'get', '/user/refresh_token')
}

