import { Client } from '../model/Client'
import { request } from './request'

import type {
  TCreateFolderBookmarkPayload,
  TCreateFolderBookmarkReturn,

  TDeleteFolderBookmarkPayload,
  TDeleteFolderBookmarkReturn,

} from './types/bookmark-folder'

export async function createFolderBookmark(client: Client, payload: TCreateFolderBookmarkPayload): Promise<TCreateFolderBookmarkReturn | undefined> {
  return request(client, 'post', '/bookmark-folder/create', payload)
}

export async function deleteBookmark(client: Client, payload: TDeleteFolderBookmarkPayload): Promise<TDeleteFolderBookmarkReturn | undefined> {
  return request(client, 'post', '/bookmark-folder/remove', payload)
}