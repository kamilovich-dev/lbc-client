import { Client } from '../model/Client'
import { request } from './request'

import type {
  TGetPersonalDataPayload,
  TGetPersonalDataReturn,

  TUpdatePersonalDataPayload,
  TUpdatePersonalDataReturn
} from './types/personal'

export async function getPersonalData(client: Client, payload: TGetPersonalDataPayload): Promise<TGetPersonalDataReturn> {
  return request(client, 'get', '/personal', payload)
}

export async function updatePersonalData(client: Client, payload: TUpdatePersonalDataPayload): Promise<TUpdatePersonalDataReturn> {
  return request(client, 'post', '/personal/update', payload)
}