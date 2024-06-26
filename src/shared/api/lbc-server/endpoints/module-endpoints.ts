import { Client } from '../model/Client'
import { request } from './request'

import { TError } from './types/error'

import type {
  TCreateModulePayload,
  TCreateModuleReturn,

  TMduleSearchParams,
  TGetModulesReturn,

  TDeleteModulePayload,
  TEditModulePayload,
  TEditModuleReturn,

  TGetModulePayload,
  TGetModuleReturn
} from './types/modules'

export async function createModule(client: Client, payload: TCreateModulePayload): Promise<TCreateModuleReturn | undefined> {
  return request(client, 'post', '/module/create', payload)
}

export async function getModules(client: Client, searchParams?: TMduleSearchParams): Promise<TGetModulesReturn | undefined> {
  let url = '/module?'
  if (searchParams) {
    //@ts-ignore
    const onlyParams = Object.keys(searchParams).filter( key => searchParams[key] !== '')
      .reduce((acc, key) => {
         //@ts-ignore
        acc[key] = searchParams[key]
        return acc
      }, {})
    const searchParamsObj = new URLSearchParams(onlyParams);
    url += searchParamsObj.toString()
  }
  return request(client, 'get', url)
}

export async function deleteModule(client: Client, payload: TDeleteModulePayload): Promise<void | TError | undefined> {
  return request(client, 'post', '/module/remove', payload)
}

export async function editModule(client: Client, payload: TEditModulePayload): Promise<TEditModuleReturn | undefined> {
  return request(client, 'post', '/module/update', payload)
}

export async function getModule(client: Client, payload: TGetModulePayload): Promise<TGetModuleReturn | undefined> {
  return request(client, 'post', '/module', payload)
}
