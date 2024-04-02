import { Client } from '../model/Client'
import { request } from './request'

import type {
  TGlobalSearchParams,
  TGlobalSearchReturn,
} from './types/global-search'

export async function globalSearch(client: Client, searchParams?: TGlobalSearchParams): Promise<TGlobalSearchReturn> {
  let url = '/global-search?'
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