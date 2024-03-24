import { Client } from '../model/Client'
import { request } from './request';

import type {
  TGetCardsPayload,
  TGetCardsReturn,

  TAddCardPayload,
  TAddCardReturn,

  TEditCardPayload,
  TEditCardReturn,

  TDeleteCardPayload,

  TSwitchOrderPayload,
} from './types/cards'

export async function getCards(client: Client, payload: TGetCardsPayload ): Promise<TGetCardsReturn | undefined> {
    return request(client, 'post', '/card', payload)
}

export async function addCard(client: Client, payload: TAddCardPayload ): Promise<TAddCardReturn | undefined> {
  return request(client, 'post', '/card/create', payload)
}

export async function editCard(client: Client, payload: TEditCardPayload ): Promise<TEditCardReturn | undefined> {
  return request(client, 'post', '/card/update', payload)
}

export async function deleteCard(client: Client, payload: TDeleteCardPayload): Promise<void | undefined> {
  return request(client, 'post', '/card/remove', payload)
}

export async function switchOrder(client: Client, payload: TSwitchOrderPayload): Promise<void | undefined> {
  return request(client, 'post', '/card/switch-order', payload)
}

