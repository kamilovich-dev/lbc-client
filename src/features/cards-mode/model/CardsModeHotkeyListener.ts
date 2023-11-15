import { CardsModeStore } from './CardsModeStore'

class CardsModeHotkeyListener {

    cardsModeStore: CardsModeStore | undefined = undefined

    constructor( cardsModeStore: CardsModeStore ) {
        if (!cardsModeStore) return

        this.cardsModeStore = cardsModeStore
        document.addEventListener('keydown', this.keyboardsListener)
    }

    keyboardsListener = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'ArrowRight':
                this.cardsModeStore?.goNextCard()
                break;
            case 'ArrowLeft':
                this.cardsModeStore?.goPrevCard()
                break;
            case 'ArrowUp':
                this.cardsModeStore?.markCardAsKnown()
                break;
            case 'ArrowDown':
                this.cardsModeStore?.markCardAsUnknown()
                break;
            case 'Space':
                this.cardsModeStore?.flipCard()
                break;
            default:
                return
        }
    }

    removeKeyboardsListener = () => {
        document.removeEventListener('keypress', this.keyboardsListener)
    }

}

export { CardsModeHotkeyListener }