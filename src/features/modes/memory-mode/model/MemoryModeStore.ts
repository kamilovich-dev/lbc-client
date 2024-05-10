import { makeAutoObservable } from "mobx";
import type { TCard } from "shared/api/lbc-server/endpoints/types/cards";


interface IMemoryCard {
    id: number,
    question: string,
    imgUrl: string,
    variants: IVariant[],
}

interface IVariant {
    value: string,
    id: number
}

interface ISettings {
    whatInAnswer: 'term' | 'definition',
    isOnlyFavoriteCards: boolean,
    isFavoriteAcceptable: boolean,
}

interface IResult {
    knownCount: number,
    unknownCount: number,
    totalCount: number,
    currentCardIndex: number,

    selectedVariant: string,

    isShowCurrentResult: boolean,
    isCurrentResultSuccess: boolean,

    isShowFinalResult: boolean,
}

export class MemoryModeStore {

    private originalCards: TCard[]
    cards: TCard[]
    memoryCards: IMemoryCard[] = []
    result: IResult
    settings: ISettings

    constructor(cards: TCard[]) {
        makeAutoObservable(this)
        this.initCards(cards)
        this.initResult(cards)
        this.initSettings()
        this.initMemoryCards()
    }

    private initSettings = () => {
        this.settings = {
            whatInAnswer: 'definition',
            isOnlyFavoriteCards: false,
            isFavoriteAcceptable: this.cards.findIndex(card => card.isFavorite) !== -1 ? true : false
        }
    }

    private initCards = ( cards: TCard[] ) => {
        this.originalCards = [...cards]
        this.cards = [...cards]
    }

    private initResult = ( cards: TCard[] ) => {
        this.result = {
            knownCount: 0,
            unknownCount: 0,
            totalCount: cards.length,
            currentCardIndex: 0,

            selectedVariant: '',

            isShowCurrentResult: false,
            isCurrentResultSuccess: false,

            isShowFinalResult: false
        }
    }

    private initMemoryCards = () => {

        const cards = [...this.cards]
        const memoryCards: IMemoryCard[] = new Array(cards.length)
        const whatInAnswer = this.settings.whatInAnswer

        for (let i = 0; i < cards.length; i++) {

            const id = cards[i].id
            const question = whatInAnswer === 'definition' ? cards[i].term : cards[i].definition
            const imgUrl = cards[i].imgUrl ? `${import.meta.env.VITE_LBC_SERVER_STATIC_URL}/${cards[i].imgUrl}` : ''

            let variants: IVariant[] = []

            let variantId = id
            let variant = whatInAnswer === 'definition' ? cards[i].definition : cards[i].term

            const variantsCount = cards.length > 4 ? 4 : cards.length
            for (let j = 0; j < variantsCount; j++) {

                if (j === 0) {
                    variants.push({
                        id: variantId,
                        value: variant
                    })
                    continue
                }

                do {
                    const max = cards.length
                    const min = 0
                    const cardIndex = Math.floor(Math.random() * (max - min) + min)
                    variantId = cards[cardIndex].id
                    variant = whatInAnswer === 'definition' ? cards[cardIndex].definition : cards[cardIndex].term
                } while ( variants.findIndex(item => item.id === variantId) !== -1)

                variants.push({
                    id: variantId,
                    value: variant
                })
            }
            variants = variants.sort(() => Math.random() - 0.5)

            memoryCards[i] = {
                id, question, imgUrl, variants: [...variants]
            }
        }

        this.memoryCards = [...memoryCards]
        this.memoryCards.sort(() => Math.random() - 0.5)
    }

    start = () => {
        this.initMemoryCards()
        this.initResult(this.cards)
    }

    switchWhatInAnswer = (value: 'term' | 'definition') => {
        this.settings.whatInAnswer = value
        this.start()
    }

    switchIsOnlyFavorite = (isFavorite: boolean) => {
        this.settings.isOnlyFavoriteCards = isFavorite

        if (this.settings.isOnlyFavoriteCards) {
            this.cards = this.originalCards.filter(item => item.isFavorite)
        } else this.cards = [...this.originalCards]

        this.start()
    }

    selectAnswer = ( variantId: number ) => {
        const memoryCard = this.memoryCards[this.result.currentCardIndex]

        this.result.selectedVariant = memoryCard.variants.find(variant => variant.id === variantId)?.value ?? ''

        if (memoryCard.id === variantId) {
            this.result.knownCount++
            this.result.isCurrentResultSuccess = true
        } else {
            this.result.unknownCount++
            this.result.isCurrentResultSuccess = false
        }

        this.result.isShowCurrentResult = true
    }

    acceptAnswer = () => {
        this.result.selectedVariant = ''
        this.result.isShowCurrentResult = false
        if (this.result.currentCardIndex < this.memoryCards.length - 1) this.result.currentCardIndex++
            else {
                this.result.isShowCurrentResult = false
                this.result.isShowFinalResult = true
            }
    }

}