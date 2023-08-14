import { AxiosInstance } from "axios"
import { TGetModulesResponse } from './types'

export async function getModules(client: AxiosInstance): Promise<TGetModulesResponse | undefined> {
  try {
    return (await client.get<TGetModulesResponse>('/module')).data;
  } catch(error) {
    console.log(error)
  }
}