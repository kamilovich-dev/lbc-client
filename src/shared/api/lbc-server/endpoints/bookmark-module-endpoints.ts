import { Client } from '../model/Client'
import { request } from './request'

import type {
  TCreateModuleBookmarkPayload,
  TCreateModuleBookmarkReturn,

  TDeleteModuleBookmarkPayload,
  TDeleteModuleBookmarkReturn,

} from './types/bookmark-module'

export async function createModuleBookmark(client: Client, payload: TCreateModuleBookmarkPayload): Promise<TCreateModuleBookmarkReturn | undefined> {
  return request(client, 'post', '/bookmark-module/create', payload)
}

export async function deleteBookmark(client: Client, payload: TDeleteModuleBookmarkPayload): Promise<TDeleteModuleBookmarkReturn | undefined> {
  return request(client, 'post', '/bookmark-module/remove', payload)
}