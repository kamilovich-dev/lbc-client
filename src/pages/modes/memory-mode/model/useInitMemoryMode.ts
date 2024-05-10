import { CardStore } from "entities/module"
import { MemoryModeStore } from 'features/modes/memory-mode';
import { useEffect, useState } from "react"

interface IProps {
    moduleId: number | undefined
}

interface IInitData {
    isLoading: boolean,
    memoryModeStore: MemoryModeStore | undefined,
}

export const useInitMemoryMode = ( { moduleId }: IProps ) => {

    useEffect(() => {
        fetchData()
    }, [])


    const [initData, setInitData] = useState<IInitData>({ isLoading: true, memoryModeStore: undefined })

    const fetchData = async () => {
        if (!moduleId) {
            setInitData({
                isLoading: false,
                memoryModeStore: undefined
            })
            return
        }

        const cardStore = new CardStore(moduleId)
        await cardStore.refreshCards()
        setInitData({
            isLoading: false,
            memoryModeStore: new MemoryModeStore(cardStore.cards)
        })
    }

    return initData
}