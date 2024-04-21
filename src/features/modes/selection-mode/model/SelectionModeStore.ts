import { makeAutoObservable, runInAction } from "mobx";
import { TCard } from "shared/api/lbc-server/endpoints/types/cards";
import { SelectionModeAnimation } from "./SelectionModeAnimation";

type TMixedCard = {
    id: number,
    value: string,
    isFound: boolean,
    isSelected: boolean,
}

export class SelectionModeStore {

    private originalCards: TCard[]
    cards: TCard[]
    private maxMixCardsLength = 18 /*Максимальное количество перемешанных карточек*/
    private timerId: NodeJS.Timer | undefined
    selectionModeAnimation: SelectionModeAnimation | undefined

    mixedCards: TMixedCard[] = [] /*Перемешанные карточки - термины и определения*/
    timerValue: string | undefined
    isFinished: boolean = false
    isOnlyFavorite: boolean = false
    isOnlyFavoriteAcceptable: boolean = false
    isMusicOn: boolean = false

    private audio: any

    constructor( cards: TCard[] ) {
        makeAutoObservable(this)
        this.originalCards = cards
        this.cards = cards
    }

    private initIsOnlyFavoriteAcceptable = () => {
        const favoriteCard = this.cards.find(card => card.isFavorite === true)
        if (favoriteCard) {
            this.isOnlyFavoriteAcceptable = true
        } else this.isOnlyFavoriteAcceptable = false
    }

    start = () => {
        this.isFinished = false
        this.initIsOnlyFavoriteAcceptable()
        this.initMixedCards()
        this.initTimer()
        this.startSound()
    }

    private startSound = () => {
        if (this.isMusicOn) {
            if (!this.audio) {
                this.audio = new Audio(`${import.meta.env.VITE_LBC_SERVER_STATIC_URL}/sound/selection-mode-sound.mp3`)
                this.audio.play()
            } else {
                this.audio.play()
            }
        }
    }

    private endSound = () => {
        if (this.audio) {
            this.audio.pause()
            this.audio.currentTime = 0
        }
    }

    switchOnlyFavorite = (isOnlyFavorite: boolean) => {
        this.isOnlyFavorite = isOnlyFavorite
        if (isOnlyFavorite) {
            this.cards = this.originalCards.filter(card => card.isFavorite === true)
        } else this.cards = this.originalCards

        this.start()
    }

    switchMusicOn = () => {
        this.isMusicOn = !this.isMusicOn
        if (this.isMusicOn) {
            this.startSound()
        } else this.endSound()
    }

    private initMixedCards = () => {
        const mixedCardsLength = this.cards.length * 2 > this.maxMixCardsLength
            ? this.maxMixCardsLength
            : this.cards.length * 2

        this.selectionModeAnimation = new SelectionModeAnimation(mixedCardsLength)
        this.mixedCards = new Array(mixedCardsLength)

        for (let i = 0; i < mixedCardsLength; i += 2) {
            /*Создать массив с перемешанными терминами и определинями*/
            let randomIdx: number
            let isDublicate = false
            let card: TCard

            do {
                randomIdx = this.getRandomIdx(0, this.cards.length)
                card = this.cards[randomIdx]
                isDublicate = this.mixedCards.findIndex(item => item?.id === card.id ) !== -1 ? true : false
            } while(isDublicate)

            this.mixedCards[i] = {
                id: card.id,
                value: card.term,
                isFound: false,
                isSelected: false
            }

            this.mixedCards[i + 1] = {
                id: card.id,
                value: card.definition,
                isFound: false,
                isSelected: false
            }
        }

        this.mixedCards.sort(() => Math.random() - 0.5)
    }

    private initTimer = () => {
        const startDate = new Date()

        clearInterval(this.timerId)
        this.timerId = setInterval(() => {
            const nowDate = new Date()
            runInAction(() => this.timerValue = this.formatTime(nowDate.getTime() - startDate.getTime()))
        }, 100)
    }

    private formatTime = (milliseconds: number) => {
        const seconds = Math.floor(milliseconds / 1000);

        const remainingMilliseconds = milliseconds % 1000;
        const formattedMilliseconds = String(remainingMilliseconds).substring(0,1);

        return `${seconds},${formattedMilliseconds} сек`;
    }

    finish = () => {
        this.endSound()
        clearInterval(this.timerId)
        this.isFinished = true
    }

    handleClick = async (mixedCardIdx: number) => {
        const card = { ...this.mixedCards[mixedCardIdx] }

        if (card.isFound) return
        if (card.isSelected) return

        card.isSelected = true
        await this.selectionModeAnimation?.select(mixedCardIdx)
        this.mixedCards[mixedCardIdx] = card

        const secondSelectedCardIdx = this.mixedCards.findIndex( (card, idx) => card.isSelected === true && mixedCardIdx !== idx)

        if (secondSelectedCardIdx !== -1) {
            await this.selectionModeAnimation?.select(secondSelectedCardIdx)

            const secondCard = this.mixedCards[secondSelectedCardIdx]
            const isFound = card.id === secondCard.id ? true : false

            this.mixedCards[mixedCardIdx] = {
                ...card,
                isSelected: false,
                isFound
            }

            this.mixedCards[secondSelectedCardIdx] = {
                ...secondCard,
                isSelected: false,
                isFound
            }

            if (isFound) {
                await this.selectionModeAnimation?.match(mixedCardIdx, secondSelectedCardIdx)
            } else await this.selectionModeAnimation?.mismatch(mixedCardIdx, secondSelectedCardIdx)
        }

        const foundCount = this.mixedCards.filter(card => card.isFound === true)
        if (foundCount.length === this.mixedCards.length) this.finish()
    }

    private getRandomIdx(min: number, max: number) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    }



}