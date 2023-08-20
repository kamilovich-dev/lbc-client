import { AxiosInstance } from "axios"
import { TLoginPayload, TLoginResponse,
        TRegisterPayload, TRegisterResponse,
        TRefreshTokenResponse } from "./types";

export async function login(client: AxiosInstance, payload: TLoginPayload): Promise<TLoginResponse | undefined> {
  try {
    return (await client.post<TLoginResponse>('/user/login', payload)).data
  } catch(error) {
    console.log('Unexpected error: ' + error)
  }
}

export async function logout(client: AxiosInstance): Promise<void> {
  try {
      await client.post<TLoginResponse>('/user/logout', {})
  } catch(error) {
      console.log(error)
  }
}

export async function register(client: AxiosInstance, payload: TRegisterPayload): Promise<TRegisterResponse | undefined> {
  try {
    return (await client.post<TRegisterResponse>('/user/registration', payload)).data;
  } catch(error) {
    console.log(error)
  }
}

export async function refreshToken(client: AxiosInstance): Promise<TRefreshTokenResponse | undefined> {
  try {
      return (await client.get<TRefreshTokenResponse>('/user/refresh_token')).data;
  } catch(error) {
      console.log(error)
  }
}