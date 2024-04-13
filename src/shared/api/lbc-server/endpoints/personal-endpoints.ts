import { Client } from '../model/Client'
import { request } from './request'

import type {
  TGetPersonalDataReturn,

  TUpdatePersonalDataPayload,
  TUpdatePersonalDataReturn
} from './types/personal'

export async function getPersonalData(client: Client): Promise<TGetPersonalDataReturn> {
  return request(client, 'get', '/personal')
}

export async function updatePersonalData(client: Client, payload: TUpdatePersonalDataPayload): Promise<TUpdatePersonalDataReturn> {
  return request(client, 'post', '/personal/update', payload)
}