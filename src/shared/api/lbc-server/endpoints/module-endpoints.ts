import {
      IClient,
      TGetModulesResponse, TMduleSearchParams,
      TCreateModuleResponse, TCreateModulePayload,
      TDeleteModulePayload } from './types'

export async function getModules(client: IClient, searchParams?: TMduleSearchParams): Promise<TGetModulesResponse | undefined> {
  try {
    const urlSearchString = new URLSearchParams(searchParams).toString();
    const url = urlSearchString ? `/module?${urlSearchString}` : '/module'
    console.log(url)
    return (await client.axiosInstance.get<TGetModulesResponse>(url)).data;
  } catch(error) {
    console.log(error)
  }
}

export async function createModule(client: IClient, payload: TCreateModulePayload): Promise<TCreateModuleResponse | undefined> {
  try {
    return (await client.axiosInstance.post<TCreateModuleResponse>('/module/create', payload)).data;
  } catch(error) {
    console.log(error)
  }
}

export async function deleteModule(client: IClient, payload: TDeleteModulePayload): Promise<void | undefined> {
  try {
    await client.axiosInstance.post<void>('/module/remove', payload)
  } catch(error) {
    console.log(error)
  }
}