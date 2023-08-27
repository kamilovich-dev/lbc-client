import { makeAutoObservable } from 'mobx';
import { cardEndpoints, Client, IClient } from 'shared/api/lbc-server';

class CardStore implements ICardStore {
    cards: TCard[] = [] ;
    client: IClient;
    filters: TCardsFilter = {
        by_alphabet: '',
        by_search: ''
    }
    DELAY_TIME: number = 1000
    delayTimer: NodeJS.Timer | undefined

    constructor() {
        makeAutoObservable(this)
        this.client = new Client()
    }

    refreshCards = async ( moduleId: number ) => {
        const cards =  (await cardEndpoints.getCards(this.client, { moduleId } ,this.filters))?.cards
        if (!cards) return
        this.cards = cards
    }

    getCardById = (id: number) => {
        return this.cards.find(
            card => card.id == id
        )
    }

    addCard = async ( moduleId: number ) => {
        await cardEndpoints.addCard(this.client, {
            moduleId: moduleId,
            term: 'Новый термин',
            definition: 'Новое определение',
            isFavorite: false
        }).then( () => {
            this.refreshCards(moduleId)
        })
    }

    deleteCardById = async (moduleId: number, cardId: number) => {
        await cardEndpoints.deleteCard(this.client, { cardId: cardId })
            .then(() => {
                this.refreshCards(moduleId)
            })
    }

    editCard = ( { moduleId, cardId, name, value, image, isDeleteImg } :  TEditCard) => {

        const card = this.cards.find(card => card.id == cardId)
        if (!card) return

        if (name == 'term') card.term = value || ''
        if (name == 'definition') card.definition = value || ''

        clearTimeout(this.delayTimer)
        this.delayTimer = setTimeout(async () => {

            const formData = new FormData()
            formData.append('cardId', cardId.toString())
            formData.append('term', card.term || '')
            formData.append('definition', card.definition || '')

            if (isDeleteImg) {
                formData.append('isDeleteImg', 'true')
            } else if (image) {
                formData.append('img', image)
            }

            await cardEndpoints.editCard(this.client,formData)
            .then( () => this.refreshCards( moduleId ))

        }, this.DELAY_TIME)

    }

}

type TEditCard = {
    moduleId: number,
    cardId: number,
    name?: string,
    value?: string,
    image?: Blob | undefined
    isDeleteImg?: boolean
}

export interface ICardStore {
    cards: TCard[],
    client: IClient,
    getCardById: (id: number) => TCard | undefined,
    addCard: (moduleId: number) => Promise<void>,
    deleteCardById: (moduleId:number,  cardId: number) => void,
    editCard: (args: TEditCard) => void,
    refreshCards: (moduleId: number) => Promise<void>
}

type TCardsFilter = {
    by_search: string,
    by_alphabet: string,
}

type TCard = {
    id: number,
    order: number,
    term: string,
    definition?: string,
    isFavorite?: boolean,
    imgUrl?: string,
}

export { CardStore }