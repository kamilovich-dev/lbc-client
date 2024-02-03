import { Client } from '../model/Client'
import { request } from './request';

import type {
  TGetCardsPayload,
  TCardSearchParams,
  TGetCardsReturn,
  TAddCardPayload,
  TAddCardReturn,
  TDeleteCardPayload,
  TEditCardReturn,
  TSwitchOrderPayload,
  TEditCardPayload
} from './types/cards'

export async function getCards(client: Client, payload: TGetCardsPayload, searchParams?: TCardSearchParams ): Promise<TGetCardsReturn | undefined> {
    const urlSearchString = new URLSearchParams(searchParams).toString();
    const url = urlSearchString ? `/card?${urlSearchString}` : '/card'
    return request(client, 'post', url, payload)
}

export async function addCard(client: Client, payload: TAddCardPayload ): Promise<TAddCardReturn | undefined> {
  return request(client, 'post', '/card/create', payload)
}

export async function deleteCard(client: Client, payload: TDeleteCardPayload): Promise<void | undefined> {
  return request(client, 'post', '/card/remove', payload)
}

export async function editCard(client: Client, payload: TEditCardPayload ): Promise<TEditCardReturn | undefined> {
  return request(client, 'post', '/card/update', payload)
}

export async function switchOrder(client: Client, payload: TSwitchOrderPayload): Promise<void | undefined> {
  return request(client, 'post', '/card/switch_order', payload)
}

