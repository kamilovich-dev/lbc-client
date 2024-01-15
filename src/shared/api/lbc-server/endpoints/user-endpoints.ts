import { AxiosError, AxiosInstance } from 'axios'
import { Client } from '../model/Client'
import {
  TLoginPayload,
  TLoginReturn
} from './types/user'

import {
  TRegisterPayload,
  TRegisterReturn
} from './types/user'

import {
  TRefreshTokenReturn
} from './types/user'

export async function login(client: Client, payload: TLoginPayload): Promise<TLoginReturn> {
  return await request<TLoginReturn>(client.axiosInstance, 'post', '/user/login', payload)
}

export async function logout(client: Client): Promise<void> {
  return await request<void>(client.axiosInstance, 'post', '/user/logout', {})
}

export async function register(client: Client, payload: TRegisterPayload): Promise<TRegisterReturn> {
  return await request<TRegisterReturn>(client.axiosInstance, 'post', '/user/registration', payload)
}

export async function refreshToken(client: Client): Promise<TRefreshTokenReturn> {
  return await request<TRefreshTokenReturn>(client.axiosInstance, 'get', '/user/refresh_token')
}

async function request<T>(
  axiosInstance: AxiosInstance,
  method: 'get' | 'post',
  url: string,
  payload?: any,
): Promise<T | undefined> {
  try {
    if (method === 'get') {
      const {data} = await axiosInstance.get<T>(url)
      return data
    }
    if (method === 'post') {
      const {data} = await axiosInstance.post<T>(url, payload)
      return data
    }
  } catch(error) {
    if (error instanceof AxiosError) {
      return error?.response?.data as T
    }
  }
}