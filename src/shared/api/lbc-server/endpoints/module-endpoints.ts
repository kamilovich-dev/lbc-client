import { AxiosInstance } from "axios"
import { TGetModulesResponse, TMduleSearchParams,
      TCreateModuleResponse, TCreateModulePayload } from './types'

export async function getModules(client: AxiosInstance, searchParams?: TMduleSearchParams): Promise<TGetModulesResponse | undefined> {
  try {
    const urlSearchString = new URLSearchParams(searchParams).toString();
    const url = urlSearchString ? `/module?${urlSearchString}` : '/module'
    console.log(url)
    return (await client.get<TGetModulesResponse>(url)).data;
  } catch(error) {
    console.log(error)
  }
}

export async function createModule(client: AxiosInstance, payload: TCreateModulePayload): Promise<TCreateModuleResponse | undefined> {
  try {
    return (await client.post<TCreateModuleResponse>('/module/create', payload)).data;
  } catch(error) {
    console.log(error)
  }
}