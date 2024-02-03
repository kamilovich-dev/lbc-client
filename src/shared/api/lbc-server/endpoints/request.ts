import { AxiosError, AxiosInstance } from 'axios'
import { Client } from '../model/Client'

const convertFormDataToDataObject = (payload: any) => {
  let obj = {} as any
  for (let [key, value] of payload.entries()) {
    obj[key] = value
  }
  return obj
}

export async function request<T>(
    client: Client,
    method: 'get' | 'post',
    url: string,
    payload?: any,
  ): Promise<T | undefined> {
    const axiosInstance = client.axiosInstance
    try {
      if (method === 'get') {
        return axiosInstance.get<T>(url, {signal: client.abortController?.signal} )
          .then(response => response?.data)
      }
      if (method === 'post') {
        return axiosInstance.post<T>(url,  payload, {signal: client.abortController?.signal})
          .then(response => response?.data)
      }
    } catch(error) {
      if (error instanceof AxiosError) {
        return error?.response?.data as T
      }
    }
  }