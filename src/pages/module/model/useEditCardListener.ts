import { useState, useEffect } from "react"
import { CardStore } from "entities/module"

export const useEditCardListener = ( cardStore: CardStore ) => {
    const [isEditModes, setEditModes] = useState<Array<boolean>>([])

    const handleSwitchEditMode = ( cardIdx: number ) => {
        const newIsEditModes = [...isEditModes]
        newIsEditModes[cardIdx] = !newIsEditModes[cardIdx]
        setEditModes(newIsEditModes)
    }

    useEffect( () => { //Инициализация режимов редактирования карточек
        const editModesArray = new Array(cardStore.cards.length)
        setEditModes(editModesArray.fill(false))
    }, [cardStore.cards.length])

    useEffect(() => { //Глобальный слушатель для обработки кликов
        const disableCardEdit = (e: any) => { //Отключение режима редактирования для всех карточек
            const cards = cardStore.cards
            for(let i = 0; i < cards.length; i++) {
                const div = e.target.closest(`div[id="${cards[i].id}"]`)
                if (e.target.id == cards[i].id || div) return
            }
            const editModesArray = new Array(cardStore.cards.length)
            setEditModes(editModesArray.fill(false))
        }

        document.body.addEventListener('click', disableCardEdit)
        return () => document.body.removeEventListener('click', disableCardEdit)
    }, [cardStore.cards.length])

    return { isEditModes, handleSwitchEditMode }
}