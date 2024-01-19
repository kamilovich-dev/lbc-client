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
  return await request(client.axiosInstance, 'post', '/user/login', payload)
}

export async function logout(client: Client): Promise<void> {
  return await request(client.axiosInstance, 'post', '/user/logout', {})
}

export async function register(client: Client, payload: TRegisterPayload): Promise<TRegisterReturn> {
  return await request(client.axiosInstance, 'post', '/user/registration', payload)
}

export async function refreshToken(client: Client): Promise<TRefreshTokenReturn> {
  return await request(client.axiosInstance, 'get', '/user/refresh_token')
}

