import { CardStore } from "entities/module"
import { SelectionModeStore } from "features/modes/selection-mode/model/SelectionModeStore"
import { useEffect, useState } from "react"

interface IProps {
    moduleId: number | undefined
}

interface IInitData {
    isLoading: boolean,
    selectionModeStore: SelectionModeStore | undefined,
}

export const useInitSelectionMode = ( { moduleId }: IProps ) => {

    useEffect(() => {
        fetchData()
    }, [])


    const [initData, setInitData] = useState<IInitData>({ isLoading: true, selectionModeStore: undefined })

    const fetchData = async () => {
        if (!moduleId) {
            setInitData({
                isLoading: false,
                selectionModeStore: undefined
            })
            return
        }

        const cardStore = new CardStore(moduleId)
        await cardStore.refreshCards()
        setInitData({
            isLoading: false,
            selectionModeStore: new SelectionModeStore(cardStore.cards)
        })
    }

    return initData
}