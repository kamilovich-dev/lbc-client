import { useState, useEffect } from "react"
import { CardStore, ModuleStore } from "entities/module"

interface ModuleInitData {
    moduleStore: ModuleStore,
    cardStore: CardStore,
}

export const useInitModule = (moduleId: number) => {

    useEffect(() => {
        fetchData()
    }, [])

    const [moduleInitData, setModuleInitData] = useState<ModuleInitData | undefined>(undefined)

    const fetchData = async () => {
        const moduleStore = new ModuleStore()
        const cardStore = new CardStore(moduleId)
        await Promise.all([moduleStore.refreshModulesByModuleId(moduleId), cardStore.refreshCards()])
        setModuleInitData({
            moduleStore,
            cardStore,
        })
    }

    return {...moduleInitData}
}