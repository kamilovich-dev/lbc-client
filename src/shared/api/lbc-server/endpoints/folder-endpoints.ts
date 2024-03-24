import { Client } from '../model/Client'
import { request } from './request'

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

export async function addModule(client: Client, payload: TAddModulePayload): Promise<void | undefined> {
  return request(client, 'post', '/folder/add-module', payload)
}

export async function removeModule(client: Client, payload: TRemoveModulePayload): Promise<void | undefined> {
  return request(client, 'post', '/folder/remove-module', payload)
}

export async function removeFolder(client: Client, payload: TRemoveFolderPayload): Promise<void | undefined> {
  return request(client, 'post', '/folder/remove', payload)
}

export async function getFolders(client: Client, searchParams?: TFolderSearchParams): Promise<TGetFolderReturn | undefined> {
  const urlSearchString = new URLSearchParams(searchParams).toString();
  const url = urlSearchString ? `/folder?${urlSearchString}` : '/folder'
  return request(client, 'get', url)
}

export async function getPublicFolders(client: Client, searchParams?: TFolderSearchParams): Promise<TGetFolderReturn | undefined> {
  const urlSearchString = new URLSearchParams(searchParams).toString();
  const url = urlSearchString ? `/folder/public?${urlSearchString}` : '/folder/public'
  return request(client, 'get', url)
}








