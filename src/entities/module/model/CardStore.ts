import { makeAutoObservable } from 'mobx';
import { cardEndpoints, Client } from 'shared/api/lbc-server';

class CardStore {
    cards: TCard[] = [] ;
    client: Client;
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
        return cardEndpoints.getCards(this.client, { moduleId } ,this.filters)
            .then (response => {
                if (response?.cards) this.cards = response.cards
            })
    }

    getCardById = (id: number) => this.cards.find(card => card.id == id)

    addCard = async ( moduleId: number ) => {
        cardEndpoints.addCard(this.client, {
            moduleId: moduleId,
            term: 'Новый термин',
            definition: 'Новое определение',
            isFavorite: false
        }).then( () => {
            this.refreshCards(moduleId)
        })
    }

    deleteCardById = async (moduleId: number, cardId: number) => {
        cardEndpoints.deleteCard(this.client, { cardId: cardId })
            .then(() => {
                this.refreshCards(moduleId)
            })
    }

    editCard = ( { moduleId, cardId, name, value, isSwitchFavorite, image, isDeleteImg } :  TEditCard) => {

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

            cardEndpoints.editCard(this.client,formData)
                .then( () => this.refreshCards( moduleId ))

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
    moduleId: number,
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