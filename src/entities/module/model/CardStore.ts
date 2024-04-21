import { makeAutoObservable, runInAction } from 'mobx';
import { cardEndpoints, Client } from 'shared/api/lbc-server';
import { ApiSuccess } from 'shared/api/lbc-server/ui/ApiSuccess';
import type { TCard, TEditCardPayload } from 'shared/api/lbc-server/endpoints/types/cards';

class CardStore {
    moduleId: number
    cards: TCard[] = [] ;
    client: Client;
    DEBOUNCE_DELAY: number = 1000
    DEBOUNCE_TIMER_ID: NodeJS.Timer | undefined

    constructor(moduleId: number) {
        makeAutoObservable(this)
        this.client = new Client()
        this.moduleId = moduleId
    }

    private debouncedCall = async<T> (callback: () => Promise<T>) => {
        clearTimeout(this.DEBOUNCE_TIMER_ID)
        return new Promise<T>( resolve => {
            this.DEBOUNCE_TIMER_ID = setTimeout( () => resolve(callback()), this.DEBOUNCE_DELAY)
        })
    }

    refreshCards = async () => {
        return cardEndpoints.getCards(this.client, { moduleId: this.moduleId })
            .then (response => {
                if (response?.isError === false) {
                    runInAction(() => this.cards = response.cards)
                }
            })
    }

    getCardById = (id: number) => this.cards.find(card => card.id == id)

    addCard = async () => {
        cardEndpoints.addCard(this.client, {
            moduleId: this.moduleId,
            term: 'Новый термин',
            definition: 'Новое определение',
            isFavorite: false
        }).then( response => {
            if (response?.isError === false) {
                this.client.renderMessage(ApiSuccess, 'Добавлено')
                this.refreshCards()
            }
        })
    }

    deleteCardById = async (cardId: number) => {
        cardEndpoints.deleteCard(this.client, { cardId })
            .then(response => {
                if (response?.isError === false) {
                    this.client.renderMessage(ApiSuccess, 'Удалено')
                    this.refreshCards()
                }
            })
    }

    updateCard = async (  { cardId, term, definition }: TUpdateCard  ) => {

        const card = this.getCardById(cardId)
        if (!card) return

        card.term = term
        card.definition = definition ?? ''

        const formdata = new FormData()
        formdata.append('cardId', String(cardId))
        formdata.append('term', term)
        formdata.append('definition', definition ?? '')

        this.debouncedCall(() => cardEndpoints.editCard(this.client, formdata as any) )
            .then(response => {
                if (response?.isError === false) {
                    this.refreshCards()
                }
            })
    }

    updateCardImage = async (  { cardId, img}: TUpdateCardImage ) => {
        const formdata = new FormData()

        formdata.append('cardId', String(cardId))

        if (img) formdata.append('imgFile', img)
                else formdata.append('imgUrl', '')

        cardEndpoints.editCard(this.client, formdata as any)
            .then(response => {
                if (response?.isError === false) {
                    this.refreshCards()
                }
            })

    }

    updateCardIsFavorite = async ( { cardId }: TUpdateCardIsFavorite) => {
        const card = this.getCardById(cardId)
        if (!card) return

        const isFavorite = card.isFavorite ? 'false' : 'true'
        card.isFavorite = isFavorite === 'true' ? true : false

        cardEndpoints.editCard(this.client, {
            cardId,
            isFavorite
        })
        .then(response => {
            if (response?.isError === false) {
                this.refreshCards()
            }
        })

    }

    switchOrder = async ( { cardId1, cardId2 }: TSwitchOrder )  => {
        cardEndpoints.switchOrder( this.client,  { cardId1, cardId2 } )
    }

}

type TSwitchOrder = {
    cardId1: number,
    cardId2: number
}

type TUpdateCard = {
    cardId: number,
    term: string,
    definition: string | undefined
}

type TUpdateCardImage = {
    cardId: number,
    img: File | undefined
}

type TUpdateCardIsFavorite = {
    cardId: number,
}

export { CardStore }