import { AxiosError, AxiosInstance } from 'axios'

export async function request<T>(
    axiosInstance: AxiosInstance,
    method: 'get' | 'post',
    url: string,
    payload?: any,
  ): Promise<T | undefined> {
    try {
      if (method === 'get') {
        const {data} = await axiosInstance.get<T>(url, payload)
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