import { useState, useEffect } from "react"
import { CardStore, ModuleStore } from "entities/module"
import { CardsModeStore } from "features/cards-mode"

interface CardsModeInitData {
    moduleStore: ModuleStore,
    cardStore: CardStore,
    cardsModeStore: CardsModeStore
}

export const useInitCardsMode = (moduleId: number) => {

    useEffect(() => {
        fetchData()
    }, [])

    const [cardsModeInitData, setcardsModeInitData] = useState<CardsModeInitData | undefined>(undefined)

    const fetchData = async () => {
        const moduleStore = new ModuleStore()
        const cardStore = new CardStore(moduleId)
        await Promise.all([moduleStore.refreshModulesByModuleId(moduleId), cardStore.refreshCards()])

        const cardsModeStore = new CardsModeStore(cardStore, moduleId)
        setcardsModeInitData({
            moduleStore,
            cardStore,
            cardsModeStore
        })
    }

    return {...cardsModeInitData}
}