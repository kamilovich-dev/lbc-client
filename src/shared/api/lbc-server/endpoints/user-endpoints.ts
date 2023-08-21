import {
        IClient,
        TLoginPayload, TLoginResponse,
        TRegisterPayload, TRegisterResponse,
        TRefreshTokenResponse } from "./types";

export async function login(client: IClient, payload: TLoginPayload): Promise<TLoginResponse | undefined> {
  try {
    return (await client.axiosInstance.post<TLoginResponse>('/user/login', payload)).data
  } catch(error) {
    console.log('Unexpected error: ' + error)
  }
}

export async function logout(client: IClient): Promise<void> {
  try {
      await client.axiosInstance.post<TLoginResponse>('/user/logout', {})
  } catch(error) {
      console.log(error)
  }
}

export async function register(client: IClient, payload: TRegisterPayload): Promise<TRegisterResponse | undefined> {
  try {
    return (await client.axiosInstance.post<TRegisterResponse>('/user/registration', payload)).data;
  } catch(error) {
    console.log(error)
  }
}

export async function refreshToken(client: IClient): Promise<TRefreshTokenResponse | undefined> {
  try {
      return (await client.axiosInstance.get<TRefreshTokenResponse>('/user/refresh_token')).data;
  } catch(error) {
      console.log(error)
  }
}