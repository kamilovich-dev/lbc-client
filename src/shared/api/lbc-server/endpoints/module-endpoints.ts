import { IClient } from '../model/Client'

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

export async function editModule(client: IClient, payload: TEditModulePayload): Promise<TEditModuleResponse | undefined> {
  try {
    return (await client.axiosInstance.post<TEditModuleResponse>('/module/update', payload)).data;
  } catch(error) {
    console.log(error)
  }
}

/*Декларация типов */
type TModule = {
  id: number,
  name: string,
  description: string,
  cardsCount: number
}

type TEditModulePayload = {
  moduleId: number,
  name: string,
  description: string
}

type TEditModuleResponse = {
  module: {
    id: number,
    name: string,
    description: string,
  }
}

type TGetModulesResponse = {
  modules: TModule[]
}

type TCreateModuleResponse = {
  module: TModule
}
type TCreateModulePayload = {
  name: string,
  description: string
}

type TDeleteModulePayload = {
  moduleId: number
}

type TMduleSearchParams = {
  by_search: string,
  by_alphabet: string // 'asc' | 'desc'
}