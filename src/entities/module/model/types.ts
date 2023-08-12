interface IModuleStore {
    modules: TModule[],
    view: IModuleViewStore,
    getModuleById: (id: number) => TModule | undefined,
    addModule: () => void,
    deleteModuleById: (id: number) => void,
    editModule: (module: TModule) => void,
}

interface ICardStore {
    cards: TCard[],
    getCardById: (id: number) => TCard | undefined,
    addCard: () => void,
    deleteCardById: (id: number) => void,
    editCard: (card: TCard) => void,
}

interface IModuleViewStore {
    modules: TModule[],
    filters: {
        byOrder: string,
        byName: string,
    },
    updateModules: (modules: TModule[]) => void,
    setFilter: (type: string, value: string  ) => void,
    filteredModules: TModule[],
}

type TModule = {
    id: number,
    name: string,
    description: string,
    cardStore: ICardStore,
}

type TCard = {
    id: number,
    term: string,
    definition: string,
    starFilled: boolean,
}

type TModulesFilter = {
    byOrder: string,
    byName: string,
}

export type {
    IModuleStore,
    IModuleViewStore,
    ICardStore,
    TModule,
    TCard,
    TModulesFilter
}