import { makeAutoObservable } from "mobx";
import type { TCard } from "shared/api/lbc-server/endpoints/types/cards";

enum QuestionType {
    write = 'write',
    choose_boolean = 'choose_boolean',
    choose = 'choose',
    match = 'match'
}

/*Режим write*/

/**
 * Интерфейс вопроса
 */

/*Сущности*/

/*Режим write: карточка, поле ввода*/

/*Режим choose_boolean: карточка, выбор*/

/*Режим choose: карточка, 4 карточки*/

/*Режим match: 4 карточки, 4 карточки*/

interface TestCard {
    id: number,
    text: string,
    image_url?: string
}

interface Progress {
    is_answered: boolean,
    is_success: boolean,
}

interface MultipleProgress extends Progress {
    answers: string[]
}

type WriteQuestion = {
    type: QuestionType.write,
    question_card: TestCard,
    answer: string,
} & Progress

type ChooseBooleanQuestion = {
    type: QuestionType.choose_boolean,
    question_card: TestCard,
    answer: string
} & Progress

type ChooseQuestion = {
    type: QuestionType.choose,
    question_card: TestCard,
    answer: string,
    variants: string[],
} & Progress

type MatchQuestion = {
    type: QuestionType.match,
    questions: Array<{
        question_card: TestCard,
        answer: string,
    }>[],
} & MultipleProgress

interface Setting {
    isWriteModeOn: boolean,
    isChooseBooleanModeOn: boolean,
    isChooseModeOn: boolean,
    isMatchModeOn: boolean,
    whatInAnswer: 'term' | 'definition',
    questionsCount: number,
    variantsCount: number,
}

interface Result {
    isShowResult: boolean,
    answered: number,
    total: number,
    answers: boolean[]
}

/**
 * Хранилище режима "Тест"
 *
 * ТЗ:
 * 4 режим тестирования:
 * 1. Написать ответ
 * 2. Верно / неверно
 * 3. Выбрать из приведенных
 * 4. Сопоставить
 *
 * В конце должен выдаваться результат в виде:
 * Отвечено верно: X из Y
 * А также, должны отображаться все элменты, где ты ответил верно или неверно в виде списка
 */
export class TestModeStore {

    cards: TCard[]
    result: Result
    settings: Setting
    questions: Array<WriteQuestion | ChooseBooleanQuestion | ChooseQuestion | MatchQuestion>

    constructor(cards: TCard[]) {
        makeAutoObservable(this)
        this.initCards(cards)
        this.initSettings()
        this.initResult(cards)
        this.initQuestions()
    }

    private initCards(cards: TCard[]) {
        this.cards = [...cards]
    }

    private initSettings() {
        this.settings = {
            isChooseBooleanModeOn: true,
            isChooseModeOn: true,
            isMatchModeOn: true,
            isWriteModeOn: true,
            whatInAnswer: 'definition',
            questionsCount: 10,
            variantsCount: 4,
        }
    }

    private initResult(cards: TCard[]) {
        this.result = {
            isShowResult: false,
            answered: 0,
            total: cards.length,
            answers: [],
        }
    }

    private initQuestions() {
        if (!this.cards) return console.log('initQuestions: this.cards не задан')

        const cards = [...this.cards]

        this.questions = new Array(this.settings.questionsCount > cards.length ? cards.length : this.settings.questionsCount)
        const used_ids:number[] = []

        for (let i = 0; i < this.questions.length; i++) {
            const types = ['write', 'choose_boolean', 'choose', 'match']
            const type = types[Math.floor( Math.random() * 3 )]

            let index: number = -1
            let card: TCard

            do {
                index = Math.floor( Math.random() * (cards.length - 1) )
                card = cards[index]
            } while(used_ids.findIndex(id => card.id === id) !== -1)

            used_ids.push(card.id)

            switch(type) {
                case 'write': {
                    const question: WriteQuestion = {
                        type: QuestionType.write,
                        question_card: {
                            id: card.id,
                            text: this.settings.whatInAnswer === 'term' ? card.definition : card.term
                        },
                        answer: this.settings.whatInAnswer === 'term' ? card.term : card.definition,
                        is_answered: false,
                        is_success: false
                    }
                    this.questions.push(question)
                    break
                }
                case 'choose_boolean': {
                    const question: ChooseBooleanQuestion = {
                        type: QuestionType.choose_boolean,
                        question_card: {
                            id: card.id,
                            text: this.settings.whatInAnswer === 'term' ? card.definition : card.term
                        },
                        answer: this.settings.whatInAnswer === 'term' ? card.term : card.definition,
                        is_answered: false,
                        is_success: false,
                    }
                    this.questions.push(question)
                    break
                }
                case 'choose': {
                    let variants: string[] = new Array(this.settings.variantsCount > this.cards.length ? this.cards.length : this.settings.variantsCount)
                    const answer = this.settings.whatInAnswer === 'term' ? card.term : card.definition
                    for (let j = 0; j < variants.length - 1; j++) {
                        const random_card = this.cards[Math.floor(Math.random() * (cards.length - 1))]
                        const variant = this.settings.whatInAnswer === 'term' ? random_card.term : random_card.definition
                        variants[j] = variant
                    }
                    variants.push(answer)
                    variants.sort(() => Math.random() - 0.5)

                    const question: ChooseQuestion = {
                        type: QuestionType.choose,
                        question_card: {
                            id: card.id,
                            text: this.settings.whatInAnswer === 'term' ? card.definition : card.term,
                        },
                        answer,
                        is_answered: false,
                        is_success: false,
                        variants
                    }
                    this.questions.push(question)
                    break
                }
                case 'match': {

                    break
                }
                default:{

                }
            }
        }
        const testCards: TTestCard[] = new Array(cards.length)
        const whatInAnswer = this.settings.whatInAnswer

        const TYPES = ['write', 'choose_boolean', 'choose', 'match']
        /*Сформировать массив карточек разного типа*/
        for (let i = 0; i < cards.length; i++) {
            const type = TYPES[Math.floor(Math.random() * 3)]
            if (type === 'write') {
                const card: IWriteCard = {
                    type,
                    id: cards[i].id,
                    imgUrl: cards[i].imgUrl ? `${import.meta.env.VITE_LBC_SERVER_STATIC_URL}/${cards[i].imgUrl}` : '',
                    question: this.settings.whatInAnswer === 'definition' ? cards[i].term : cards[i].definition
                }
                testCards.push(card)
            }
            if (type === 'choose_boolean') {
                const card: IChooseBooleanCard = {
                    type,
                    id: cards[i].id,
                    imgUrl: cards[i].imgUrl ? `${import.meta.env.VITE_LBC_SERVER_STATIC_URL}/${cards[i].imgUrl}` : '',
                    question: this.settings.whatInAnswer === 'definition' ? cards[i].term : cards[i].definition
                }
            }
        }

    }


}