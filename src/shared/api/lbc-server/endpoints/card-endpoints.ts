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
} from './types/cards'

export async function getCards(client: Client, payload: TGetCardsPayload, searchParams?: TCardSearchParams ): Promise<TGetCardsReturn | undefined> {
    const urlSearchString = new URLSearchParams(searchParams).toString();
    const url = urlSearchString ? `/card?${urlSearchString}` : '/card'
    return await request(client.axiosInstance, 'post', url, payload)
}

export async function addCard(client: Client, payload: TAddCardPayload ): Promise<TAddCardReturn | undefined> {
  return await request(client.axiosInstance, 'post', '/card/create', payload)
}

export async function deleteCard(client: Client, payload: TDeleteCardPayload): Promise<void | undefined> {
  return await request(client.axiosInstance, 'post', '/card/remove', payload)
}

export async function editCard(client: Client, payload: FormData ): Promise<TEditCardReturn | undefined> {
  return await request(client.axiosInstance, 'post', '/card/update', payload)
}

export async function switchOrder(client: Client, payload: TSwitchOrderPayload): Promise<void | undefined> {
  return await request(client.axiosInstance, 'post', '/card/switch_order', payload)
}

