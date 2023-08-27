import { IClient } from '../model/Client'

export async function getCards(client: IClient, payload: TGetCardsPayload, searchParams?: TCardSearchParams ): Promise<TGetCardsResponse | undefined> {
    try {
      const urlSearchString = new URLSearchParams(searchParams).toString();
      const url = urlSearchString ? `/card?${urlSearchString}` : '/card'
      console.log(url)
      return (await client.axiosInstance.post<TGetCardsResponse>(url, payload)).data;
    } catch(error) {
      console.log(error)
    }
}

export async function addCard(client: IClient, payload: TAddCardPayload ): Promise<TAddCardResponse | undefined> {
    try {
      const url = '/card/create'
      return (await client.axiosInstance.post<TAddCardResponse>(url, payload)).data;
    } catch(error) {
      console.log(error)
    }
}

export async function deleteCard(client: IClient, payload: TDeleteCardPayload): Promise<void | undefined> {
    try {
      await client.axiosInstance.post<void>('/card/remove', payload)
    } catch(error) {
      console.log(error)
    }
  }

export async function editCard(client: IClient, payload: FormData ): Promise<TEditCardResponse | undefined> {
    try {
      const url = '/card/update'
      return (await client.axiosInstance.post<TEditCardResponse>(url, payload)).data;
    } catch(error) {
      console.log(error)
    }
}

export async function switchOrder(client: IClient, payload: TSwitchOrderPayload): Promise<void | undefined> {
  try {
    await client.axiosInstance.post<void>('/card/switch_order', payload)
  } catch(error) {
    console.log(error)
  }
}

type TSwitchOrderPayload = {
  cardId1: number,
  cardId2: number
}

type TCard = {
    id: number,
    order: number,
    term: string,
    definition: string,
    isFavorite: boolean,
    imgUrl: string,
}

type TGetCardsPayload = {
    moduleId: number
}

type TCardSearchParams = {
    by_search: string,
    by_alphabet: string // 'asc' | 'desc'
}

type TGetCardsResponse = {
    cards: TCard[]
}

type TAddCardPayload ={
    moduleId: number,
    term: string,
    definition: string,
    isFavorite: boolean
}

type TAddCardResponse = {
    card: TCard
}

type TDeleteCardPayload = {
    cardId: number
}

type TEditCardResponse = {
  card: TCard
}