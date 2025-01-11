import { useState, useEffect } from "react"
import { CardStore } from "entities/module"
import { TestModeStore } from "features/modes/test-mode"

export const useInitTestMode = (moduleId: number) => {

    useEffect(() => {
        fetchData()
    }, [])

    const [testModeInitdata, setTestModeInitData] = useState<TestModeStore | undefined>(undefined)

    const fetchData = async () => {
        const cardStore = new CardStore(moduleId)
        await Promise.all([cardStore.refreshCards()])
        const testModeStore = new TestModeStore(cardStore.cards)
        setTestModeInitData(testModeStore)
    }

    return testModeInitdata
}