import { Client } from '../model/Client'
import { request } from './request'

import type {
  TCreateModulePayload,
  TCreateModuleReturn,

  TMduleSearchParams,
  TGetModuleReturn,

  TDeleteModulePayload,
  TEditModulePayload,
  TEditModuleReturn
} from './types/modules'

export async function createModule(client: Client, payload: TCreateModulePayload): Promise<TCreateModuleReturn | undefined> {
  return request(client, 'post', '/module/create', payload)
}

export async function getModules(client: Client, searchParams?: TMduleSearchParams): Promise<TGetModuleReturn | undefined> {
  const urlSearchString = new URLSearchParams(searchParams).toString();
  const url = urlSearchString ? `/module?${urlSearchString}` : '/module'
  return request(client, 'get', url)
}

export async function deleteModule(client: Client, payload: TDeleteModulePayload): Promise<void | undefined> {
  return request(client, 'post', '/module/remove', payload)
}

export async function editModule(client: Client, payload: TEditModulePayload): Promise<TEditModuleReturn | undefined> {
  return request(client, 'post', '/module/update', payload)
}

/*Новые*/
export async function getPublicModules(client: Client, searchParams?: TMduleSearchParams): Promise<TGetModuleReturn | undefined> {
  const urlSearchString = new URLSearchParams(searchParams).toString();
  const url = urlSearchString ? `/module/public?${urlSearchString}` : '/module/public'
  return request(client, 'get', url)
}








