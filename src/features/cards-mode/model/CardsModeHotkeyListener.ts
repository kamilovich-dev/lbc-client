import { CardsModeStore } from './CardsModeStore'

class CardsModeHotkeyListener {

    cardsModeStore: CardsModeStore | undefined = undefined

    constructor( cardsModeStore: CardsModeStore ) {
        if (!cardsModeStore) return

        this.cardsModeStore = cardsModeStore
        document.addEventListener('keydown', this.keyboardsListener)
    }

    keyboardsListener = async (e: KeyboardEvent) => {
        switch (e.code) {
            case 'ArrowRight':
                e.preventDefault()
                if (this.cardsModeStore?.cardsSorted === false) this.cardsModeStore?.goNextCard()
                break;
            case 'ArrowLeft':
                e.preventDefault()
                if (this.cardsModeStore?.cardsSorted === false) this.cardsModeStore?.goPrevCard()
                if (this.cardsModeStore?.cardsSorted === true)  this.cardsModeStore?.cancelCard()
                break;
            case 'ArrowUp':
                e.preventDefault()
                if (this.cardsModeStore?.cardsSorted === true) this.cardsModeStore?.markCardAsKnown()
                break;
            case 'ArrowDown':
                e.preventDefault()
                if (this.cardsModeStore?.cardsSorted === true) this.cardsModeStore?.markCardAsUnknown()
                break;
            case 'Space':
                e.preventDefault()
                this.cardsModeStore?.flipCard()
                break;
            case 'KeyS':
                e.preventDefault()
                this.cardsModeStore?.setAsFavorite()
                break
            default:
                return
        }
    }

    removeKeyboardsListener = () => {
        document.removeEventListener('keypress', this.keyboardsListener)
    }

}

export { CardsModeHotkeyListener }