import { Client } from '../model/Client'
import { request } from './request'

import { TError } from './types/error'

import type {
  TCreateFolderPayload,
  TCreateFolderReturn,

  TUpdateFolderPayload,
  TUpdateFolderReturn,

  TAddModulePayload,

  TRemoveModulePayload,

  TRemoveFolderPayload,

  TFolderSearchParams,
  TGetFolderReturn,
} from './types/folder'

export async function createFolder(client: Client, payload: TCreateFolderPayload): Promise<TCreateFolderReturn | undefined> {
  return request(client, 'post', '/folder/create', payload)
}

export async function updateFolder(client: Client, payload: TUpdateFolderPayload): Promise<TUpdateFolderReturn | undefined> {
  return request(client, 'post', '/folder/update', payload)
}

export async function addModule(client: Client, payload: TAddModulePayload): Promise<void | TError | undefined> {
  return request(client, 'post', '/folder/add-module', payload)
}

export async function removeModule(client: Client, payload: TRemoveModulePayload): Promise<void | TError | undefined> {
  return request(client, 'post', '/folder/remove-module', payload)
}

export async function removeFolder(client: Client, payload: TRemoveFolderPayload): Promise<void | TError | undefined> {
  return request(client, 'post', '/folder/remove', payload)
}

export async function getFolders(client: Client, searchParams?: TFolderSearchParams): Promise<TGetFolderReturn | undefined> {
  let url = '/folder?'
  if (searchParams) {
    //@ts-ignore
    const onlyParams = Object.keys(searchParams).filter( key => searchParams[key] !== undefined)
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

export async function getPublicFolders(client: Client, searchParams?: TFolderSearchParams): Promise<TGetFolderReturn | undefined> {
  let url = '/folder/public?'
  if (searchParams) {
    //@ts-ignore
    const onlyParams = Object.keys(searchParams).filter( key => searchParams[key] !== undefined)
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








