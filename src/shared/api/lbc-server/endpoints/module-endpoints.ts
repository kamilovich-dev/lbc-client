import { Client } from '../model/Client'
import { request } from './request'

import type {
  TMduleSearchParams,
  TGetModuleReturn,
  TCreateModulePayload,
  TCreateModuleReturn,
  TDeleteModulePayload,
  TEditModulePayload,
  TEditModuleResponse
} from './types/modules'

export async function getModules(client: Client, searchParams?: TMduleSearchParams): Promise<TGetModuleReturn | undefined> {
  const urlSearchString = new URLSearchParams(searchParams).toString();
  const url = urlSearchString ? `/module?${urlSearchString}` : '/module'
  return request(client, 'get', url)
}

export async function createModule(client: Client, payload: TCreateModulePayload): Promise<TCreateModuleReturn | undefined> {
  return request(client, 'post', '/module/create', payload)
}

export async function deleteModule(client: Client, payload: TDeleteModulePayload): Promise<void | undefined> {
  return request(client, 'post', '/module/remove', payload)
}

export async function editModule(client: Client, payload: TEditModulePayload): Promise<TEditModuleResponse | undefined> {
  return request(client, 'post', '/module/update', payload)
}








