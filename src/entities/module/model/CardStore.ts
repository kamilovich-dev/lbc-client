import { makeAutoObservable } from 'mobx';
import { cardEndpoints, Client } from 'shared/api/lbc-server';
import { ApiSuccess } from 'shared/api/lbc-server/ui/ApiSuccess';

class CardStore {
    moduleId: number
    cards: TCard[] = [] ;
    client: Client;
    filters: TCardsFilter = {
        by_alphabet: '',
        by_search: ''
    }
    DELAY_TIME: number = 1000
    delayTimer: NodeJS.Timer | undefined

    constructor(moduleId: number) {
        makeAutoObservable(this)
        this.client = new Client()
        this.moduleId = moduleId
    }

    refreshCards = async () => {
        return cardEndpoints.getCards(this.client, { moduleId: this.moduleId } ,this.filters)
            .then (response => {
                if (response?.cards) this.cards = response.cards
            })
    }

    getCardById = (id: number) => this.cards.find(card => card.id == id)

    addCard = async () => {
        cardEndpoints.addCard(this.client, {
            moduleId: this.moduleId,
            term: 'Новый термин',
            definition: 'Новое определение',
            isFavorite: false
        }).then( () => {
            this.refreshCards()
            this.client.renderMessage(ApiSuccess, 'Добавлено', 200)
        })
    }

    deleteCardById = async (cardId: number) => {
        cardEndpoints.deleteCard(this.client, { cardId: cardId })
            .then(() => {
                this.refreshCards()
                this.client.renderMessage(ApiSuccess, 'Удалено', 200)
            })
    }

    editCard = ( { cardId, name, value, isSwitchFavorite, image, isDeleteImg } :  TEditCard) => {
        const card = this.cards.find(card => card.id == cardId)
        if (!card) return

        if (name == 'term') card.term = value || ''
        if (name == 'definition') card.definition = value || ''
        if (isSwitchFavorite) {
            if (card.isFavorite == true || card.isFavorite == false) {
                card.isFavorite = !card.isFavorite
            } else {
                card.isFavorite = true
            }
        }

        clearTimeout(this.delayTimer)
        this.delayTimer = setTimeout(async () => {
            const formData = new FormData()
            formData.append('cardId', cardId.toString())
            formData.append('term', card.term || '')
            formData.append('definition', card.definition || '')

            if (isSwitchFavorite) formData.append('isFavorite', String(card.isFavorite))

            if (isDeleteImg) {
                formData.append('isDeleteImg', 'true')
            } else if (image) {
                formData.append('img', image)
            }

            cardEndpoints.editCard(this.client, formData as any)
                .then( () => this.refreshCards())

        }, isDeleteImg || image || isSwitchFavorite ? 0 : this.DELAY_TIME)

    }

    switchOrder = async ( { cardId1, cardId2 }: TSwitchOrder )  => {
        cardEndpoints.switchOrder( this.client,  {cardId1, cardId2} )
    }

}

type TSwitchOrder = {
    cardId1: number,
    cardId2: number
}

type TEditCard = {
    cardId: number,
    name?: string,
    value?: string,
    isSwitchFavorite?: boolean,
    image?: Blob | undefined
    isDeleteImg?: boolean
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