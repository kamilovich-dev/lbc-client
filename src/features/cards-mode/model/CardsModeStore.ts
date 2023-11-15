import { makeAutoObservable, autorun } from "mobx"
import { CardAnimation } from "./CardAnimation"
import { SortedCounterAnimation } from "./SortedCounterAnimation"

class CardsModeStore {
    initialCards: TCard[] = []
    cardsWithoutFilters: TCard[] = []
    cards: TCard[] = []
    currentIdx: number = 0
    autplayTimerId: NodeJS.Timeout | undefined
    cardsWithStarCount: number = 0

    cardAnimation: CardAnimation
    sortedCounterAnimation: SortedCounterAnimation

    cardFlipped: boolean = false
    helpShown: boolean = false
    whatInAnswer: TAnswer = 'definition'
    autoplayOn: boolean = false
    cardsMixed: boolean = false

    cardsSorted: boolean = false
    knowledge: Array<boolean> = []
    onlyStarsOn: boolean = false

    resultShown: boolean = false

    constructor( cards: TCard[] ) {
        makeAutoObservable(this)
        this.cards = [...cards]
        this.initialCards = [...cards]
        this.cardAnimation = new CardAnimation()
        this.sortedCounterAnimation = new SortedCounterAnimation()

        autorun(() => {
            this.cardsWithStarCount = this.cards.reduce( (accumulator, currentValue) => accumulator + (currentValue.isFavorite ? 1 : 0), 0 )
            this.autorunHandleOnlyStarsOnSituations()
        })

    }

    /*Обработка ситуации
        1. onlyStarsOn = true
        2. cardsWithStarCount = 0 */
    autorunHandleOnlyStarsOnSituations = () => {
        if (this.cardsWithStarCount == 0 && this.onlyStarsOn == true) {
            this.onlyStarsOn = false
            this.cards = [...this.cardsWithoutFilters]
            this.restart()
        }
    }

    flipCard = () => {
        if (this.whatInAnswer == 'both') return
        this.cardFlipped = !this.cardFlipped
        this.cardAnimation.flip(this.cardFlipped)
    }

    showHelp = () => this.helpShown = !this.helpShown

    /*Автовоспроизведение */
    autoplay = (refs: Array<React.RefObject<HTMLElement>>) => {
        if (this.autoplayOn) {
            this.autoplayOn = false
            clearInterval(this.autplayTimerId)
            return
        }

        if (!this.autoplayOn) {
            this.restart()
            this.autoplayOn = true
            let refIdx = 0

            if (this.whatInAnswer == 'both') {
                refIdx = 1
                this.autplayTimerId = setInterval( () => {
                    if (this.currentIdx == this.cards.length - 1) clearInterval(this.autplayTimerId)
                    const ref = refs[refIdx]
                    if (ref && ref.current) ref.current?.click();
                }, 1000 )
            } else {
                this.autplayTimerId = setInterval( () => {
                    if (this.currentIdx == this.cards.length - 1 && refIdx == refs.length - 1) clearInterval(this.autplayTimerId)
                    const ref = refs[refIdx]
                    if (ref && ref.current) ref.current?.click();
                    refIdx = refIdx == refs.length - 1 ? 0 : refIdx + 1
                }, 1000 )
            }

        }
    }
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
        this.restart()
    }
    onlyStars = () => {
        this.onlyStarsOn = !this.onlyStarsOn
        if (this.onlyStarsOn) {
            this.cardsWithoutFilters = [...this.cards]
            this.cards = this.cards.filter(card => card.isFavorite == true)
            this.restart()
        } else {
            this.cards = [...this.cardsWithoutFilters]
            this.restart()
        }
    }
    getHelpText = () => {
        const card = this.cards[this.currentIdx]
        if (this.helpShown) {
            if (this.whatInAnswer == 'term' && card.term && card.term.length > 0) {
                const words = card.term.match(/^[A-Za-zА-Яа-я]+/)
                if (words) return words[0] ? card.term[0] + '_'.repeat(words[0].length - 1) : '_'
            }

            if (this.whatInAnswer == 'definition' && card.definition && card.definition.length > 0) {
                const words = card.definition.match(/^[A-Za-zА-Яа-я]+/)
                if (words) return words[0] ? card.definition[0] + '_'.repeat(words[0].length - 1) : '_'
            }
            return '_'
        }
        return 'Показать подсказку'
    }

    getCountOfKnown = () => {
        if (!this.cardsSorted) return this.cards.length
        return this.knowledge.filter(item => item == true).length
    }

    getCountOfUnknown = () => {
        if (!this.cardsSorted) return 0
        return this.knowledge.filter(item => item == false).length
    }

    //only view
    goNextCard = () => {
        if (this.currentIdx == this.cards.length - 1) {
            this.resultShown = true
            return
        }
        this.currentIdx++
        this.cardFlipped = false
        this.helpShown = false
        this.cardAnimation.next()
    }

    goPrevCard = () => {
        if (this.currentIdx == 0) return
        this.resultShown = false
        this.currentIdx--
        this.cardFlipped = false
        this.helpShown = false
        this.cardAnimation.prev()
    }

    //sort
    markCardAsKnown = () => {
        if (this.currentIdx == this.cards.length - 1) {
            this.knowledge.push(true)
            this.resultShown = true
            return
        }
        this.cardFlipped = false
        this.knowledge.push(true)
        this.currentIdx++
        this.cardAnimation.known()
        this.sortedCounterAnimation.plus1known()
    }
    markCardAsUnknown = () => {
        if (this.currentIdx == this.cards.length - 1) {
            this.knowledge.push(false)
            this.resultShown = true
            return
        }
        this.cardFlipped = false
        this.knowledge.push(false)
        this.currentIdx++
        this.cardAnimation.unknown()
        this.sortedCounterAnimation.plus1unknown()
    }
    cancelCard = async () => {
        if (this.currentIdx == 0) return
        await this.cardAnimation.cancel()

        this.resultShown = false
        this.cardFlipped = false
        const lastKnowledge = this.knowledge.at(-1)
        this.knowledge.splice(-1)
        this.currentIdx--
        lastKnowledge == true ? this.sortedCounterAnimation.minus1known() : this.sortedCounterAnimation.minus1unknown()
    }

    goPrevFromResult = () => {
        if (this.cardsSorted) {
            this.knowledge.splice(-1)
            this.resultShown = false
            return
        }
        this.resultShown = false
    }

    restart = () => {
        this.resultShown = false
        this.knowledge.splice(0)
        this.cardAnimation.reset()
        this.cardFlipped = false
        this.helpShown = false
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

export type TAnswer = 'term' | 'definition' | 'both'
export { CardsModeStore }