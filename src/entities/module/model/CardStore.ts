import { makeObservable, observable, action} from 'mobx';
import type { ICardStore, TCard } from './types';

class CardStore implements ICardStore {
    cards:TCard[] = [] ;

    constructor() {
        makeObservable(this, {
            cards: observable,
            addCard: action,
            deleteCardById: action,
            editCard: action
        })
    }

    getCardById = (id: number) => {
        return this.cards.find(
            card => card.id === id
        )
    }

    addCard = () => {
        const id = this.cards.length === 0 ? 0 : this.cards.length;
        this.cards.push({
            id: id,
            term: '',
            definition: '',
            starFilled: false
        })
    }

    deleteCardById = (id: number) => {
        this.cards = this.cards.filter(card => card.id !== id)
    }

    editCard = (card: TCard) => {
        const idx = this.cards.findIndex(item => item.id === card.id);
        this.cards[idx] = card;
    }
}

export { CardStore }