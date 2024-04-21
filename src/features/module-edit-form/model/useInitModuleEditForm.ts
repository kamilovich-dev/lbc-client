import { ModuleStore, CardStore } from 'entities/module';
import { useEffect, useState } from 'react';

interface IInitData {
    moduleStore: ModuleStore | undefined,
    cardStore: CardStore | undefined,
}


export const useInitModuleEditForm = ( moduleId: number ) => {

    const [initData, setInitData] = useState<IInitData>({ moduleStore: undefined, cardStore: undefined })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async() => {
        const moduleStore = new ModuleStore()
        const cardStore = new CardStore(moduleId)

        await Promise.all([moduleStore.refreshModules(), cardStore.refreshCards()])
        setInitData({
            moduleStore, cardStore
        })
    }

    return initData
}