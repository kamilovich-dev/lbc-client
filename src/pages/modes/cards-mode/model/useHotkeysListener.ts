import { CardsModeHotkeyListener, CardsModeStore } from 'features/modes/cards-mode'
import { useEffect } from 'react'

interface IProps {
    cardsModeStore: CardsModeStore
}

export const useHotkeysListener = ( cardsModeStore: IProps['cardsModeStore'] ) => {
    useEffect( () => {
        const listener = new CardsModeHotkeyListener(cardsModeStore)
        return listener.removeKeyboardsListener
    }, [])

}