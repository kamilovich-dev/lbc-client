import { makeObservable, observable, action} from 'mobx';
import { cardEndpoints, Client, IClient } from 'shared/api/lbc-server';

class CardStore implements ICardStore {
    cards: TCard[] = [] ;
    client: IClient;
    filters: TCardsFilter = {
        by_alphabet: 'asc',
        by_search: ''
    }
    delayTimer: NodeJS.Timer | undefined

    constructor() {
        makeObservable(this, {
            cards: observable,
            addCard: action,
            deleteCardById: action,
            editCard: action
        })
        this.client = new Client()
    }

    refreshCards = async ( moduleId: number ) => {
        const cards =  (await cardEndpoints.getCards(this.client, { moduleId } ,this.filters))?.cards
        if (!cards) return
        this.cards = cards
    }

    getCardById = (id: number) => {
        return this.cards.find(
            card => card.id === id
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

    editCard = (card: TCard) => {
        const idx = this.cards.findIndex(item => item.id === card.id);
        this.cards[idx] = card;
    }
}

export interface ICardStore {
    cards: TCard[],
    client: IClient,
    getCardById: (id: number) => TCard | undefined,
    addCard: (moduleId: number) => Promise<void>,
    deleteCardById: (moduleId:number,  cardId: number) => void,
    editCard: (card: TCard) => void,
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
    definition: string,
    isFavorite: boolean,
    imgUrl: string,
}

export { CardStore }