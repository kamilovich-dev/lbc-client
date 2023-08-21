import { IClient } from 'shared/api'

interface IModuleStore {
    modules: TModule[],
    filters: TModulesFilter,
    delayTimer: typeof setTimeout | null,
    client: IClient;
    setFilter: (type: string, value: string) => void,
    getModuleById: (id: number) => TModule | undefined,
    refreshModules: () => Promise<void>,
    addModule: () => void,
    deleteModuleById: (id: number) => Promise<void>,
    editModule: (module: TModule) => void,
}

interface ICardStore {
    cards: TCard[],
    getCardById: (id: number) => TCard | undefined,
    addCard: () => void,
    deleteCardById: (id: number) => void,
    editCard: (card: TCard) => void,
}

type TModule = {
    id: number,
    name: string,
    description: string,
    cardsCount: number
}

type TCard = {
    id: number,
    term: string,
    definition: string,
    starFilled: boolean,
}

type TModulesFilter = {
    by_search: string,
    by_alphabet: string,
}

export type {
    IModuleStore,
    ICardStore,
    TModule,
    TCard,
    TModulesFilter
}