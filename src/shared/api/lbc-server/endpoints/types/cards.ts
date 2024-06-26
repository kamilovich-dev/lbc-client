import type { TError } from "./error"
export type TCard = {
    id: number,
    order: number,
    term: string,
    definition: string,
    isFavorite: boolean,
    imgUrl: string,
}

/*Получение карточке модуя*/
export type TGetCardsPayload = {
    moduleId: number
}
export type TCardSearchParams = {
    by_search: string,
    by_alphabet: string // 'asc' | 'desc'
}
export type TGetCardsResponse = {
    cards: TCard[]
}
export type TGetCardsReturn = (TGetCardsResponse & TError) | undefined

/*Добавление карточки*/
export type TAddCardPayload ={
    moduleId: number,
    term: string,
    definition: string,
    isFavorite: boolean
}
export type TAddCardResponse = {
    card: TCard
}
export type TAddCardReturn = (TAddCardResponse & TError) | undefined

/*Удаление карточки*/
export type TDeleteCardPayload = {
    cardId: number
}

/*Редактирование карточки*/
export type TEditCardResponse = {
    card: TCard
}
export interface TEditCardPayload {
    cardId: number,
    term?: string,
    definition?: string,
    isFavorite?: 'true' | 'false',
    imgFile?: File,
    imgUrl?: '' ,
}
export type TEditCardReturn = (TEditCardResponse & TError) | undefined

/*Смена двух карточек местами*/
export type TSwitchOrderPayload = {
    cardId1: number,
    cardId2: number
}