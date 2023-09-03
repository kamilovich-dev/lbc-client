import { makeAutoObservable } from "mobx"

class CardsModeStore {
    initialCards: TCard[] = []
    cards: TCard[] = []
    currentIdx: number = 0

    cardFlipped: boolean = false
    helpShown: boolean = false
    paramsShown: boolean = false
    whatInAnswer: TAnswer = 'definition'
    autoplayOn: boolean = false
    cardsMixed: boolean = false

    cardsSorted: boolean = false
    knowledge: Array<boolean> = []
    onlyStarsOn: boolean = false

    constructor( cards: TCard[] ) {
        makeAutoObservable(this)
        this.cards = [...cards]
        this.initialCards = [...cards]
    }

    flipCard = () => this.cardFlipped = !this.cardFlipped
    showParams = () => this.paramsShown = !this.paramsShown
    showHelp = () => this.helpShown = !this.helpShown
    autoplay = () => this.autoplayOn = !this.autoplayOn
    sortCards = () => {
        this.cardsSorted = !this.cardsSorted
        this.restart()
    }
    mixCards = () => {
        if (!this.cardsMixed) {
            const cards = [...this.cards]
            for (let i = cards.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
            this.cards = cards
            this.cardsMixed = true
            this.restart()
        } else {
            this.cards = [...this.initialCards]
            this.cardsMixed = false
            this.restart()
        }
    }
    changeAnswer = (answer: TAnswer) => {
        this.whatInAnswer = answer
    }
    onlyStars = () => {
        this.onlyStarsOn = !this.onlyStarsOn
    }
    getHelpText = () => {
        const card = this.cards[this.currentIdx]
        if (this.helpShown) {
            if (this.whatInAnswer == 'term' && card.term.length) {
                const words = card.term.match(/(\w+)/)
                if (words) return words[0] ? card.term[0] + '_'.repeat(words[0].length - 1) : '_'
            }

            if (this.whatInAnswer == 'definition' && card.definition?.length) {
                const words = card.definition.match(/(\w+)/)
                if (words) return words[0] ? card.definition[0] + '_'.repeat(words[0].length - 1) : '_'
            }
            return '_'
        }
        return 'Показать подсказку'
    }

    //only view
    goNextCard = () => {
        if (this.currentIdx == this.cards.length - 1) return
        this.currentIdx++
    }

    goPrevCard = () => {
        if (this.currentIdx == 0) return
        this.currentIdx--
    }

    //sort
    markCardAsKnown = () => {
        this.knowledge.push(true)
    }
    markCardAsUnknown = () => {
        this.knowledge.push(false)
    }
    cancelCard = () => {
        if (this.knowledge.length == 0) return
        this.knowledge.splice(-1)
    }

    restart = () => {
        this.knowledge.splice(0)
        this.currentIdx = 0
    }

}


export type TCard = {
    id: number,
    order: number,
    term: string,
    definition?: string,
    isFavorite?: boolean,
    imgUrl?: string,
}

type TAnswer = 'term' | 'definition' | 'both'

export { CardsModeStore }