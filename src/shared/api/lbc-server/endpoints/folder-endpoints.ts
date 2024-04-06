import { Client } from '../model/Client'
import { request } from './request'

import { TError } from './types/error'

import type {
  TCreateFolderPayload,
  TCreateFolderReturn,

  TUpdateFolderPayload,
  TUpdateFolderReturn,

  TAddModulePayload,

  TRemoveFolderPayload,

  TFolderSearchParams,
  TGetFoldersReturn,

  TGetFolderModulesPayload,
  TGetFolderModulesReturn,

  TGetFolderPayload,
  TGetFolderReturn
} from './types/folder'

export async function createFolder(client: Client, payload: TCreateFolderPayload): Promise<TCreateFolderReturn> {
  return request(client, 'post', '/folder/create', payload)
}

export async function updateFolder(client: Client, payload: TUpdateFolderPayload): Promise<TUpdateFolderReturn > {
  return request(client, 'post', '/folder/update', payload)
}

export async function addModule(client: Client, payload: TAddModulePayload): Promise<void | TError | undefined> {
  return request(client, 'post', '/folder/add-module', payload)
}

export async function removeFolder(client: Client, payload: TRemoveFolderPayload): Promise<void | TError | undefined> {
  return request(client, 'post', '/folder/remove', payload)
}

export async function getFolders(client: Client, searchParams?: TFolderSearchParams): Promise<TGetFoldersReturn> {
  let url = '/folder?'
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

export async function getFolderModules(client: Client, payload: TGetFolderModulesPayload): Promise<TGetFolderModulesReturn> {
  return request(client, 'post', '/folder/modules', payload)
}

export async function getFolder(client: Client, payload: TGetFolderPayload): Promise<TGetFolderReturn | undefined> {
  return request(client, 'post', '/folder', payload)
}








