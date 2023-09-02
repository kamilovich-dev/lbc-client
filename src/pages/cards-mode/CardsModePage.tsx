import { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"

import { ModesMenu } from "features/navigation"
import { BackButton } from "features/navigation"

import { CardStore, ModuleStore,
        TModule } from "entities/module"

import { CardFastEditStore, CardsModeStore,
        TCard } from "features/cards-mode"

import { ParametersButton } from '../../features/cards-mode/ui/ParametersButton'
import { FlipCard } from "features/cards-mode"

const CardsModePage = () => {
    const { moduleId } = useParams()
    if (!moduleId) return;

    const [cards, setCards] = useState<Array<TCard>>([])
    const [module, setModule] = useState<TModule | undefined>(undefined)

    useEffect( () => {
        const cardStore = new CardStore()
        const moduleStore = new ModuleStore()

        moduleStore.refreshModules()
            .then(() => setModule(moduleStore.getModuleById(parseInt(moduleId))))

        cardStore.refreshCards(parseInt(moduleId))
            .then(() => setCards(cardStore.cards))
    }, [])

    if (!module || !cards.length) return

    const cardsModeStore = new CardsModeStore(cards)
    return (
        <_CardsModePage cardsModeStore={cardsModeStore} module={module}/>
    )
}

interface IProps {
    cardsModeStore: CardsModeStore,
    module: TModule
}


const _CardsModePage = observer(( { cardsModeStore, module }: IProps ) => {

    const cardIdx = cardsModeStore.currentIdx
    const card = cardsModeStore.cards[cardIdx]

    return (
        <>
            <div className="flex gap-4 mb-4">
                <div className="w-1/3  flex  items-center">
                    <ModesMenu/>
                </div>
                <div className="w-1/3 flex-row ">
                    <div className="text-center text-lg font-semibold text-slate-700">
                        {cardsModeStore.currentIdx + 1} / {cardsModeStore.cards.length}
                    </div>
                    <div className="text-center text-lg font-bold text-slate-700">
                        { module.name }
                    </div>
                </div>
                <div className="w-1/3  flex gap-4 justify-end items-center">
                    <ParametersButton handleClick={cardsModeStore.showParams}/>
                    <div className="w-10">
                        <BackButton />
                    </div>
                </div>
            </div>

            <div className="mb-4 h-[600px]">
                <FlipCard
                    card={card}/>
            </div>


            <div>Автовоспроизведение</div>
            <div>Кнопки навигации</div>

            <div>Счетчик еще изучаю</div>
            <div>Счетчик знаю</div>
            <div>Отменить</div>
            <div>Кнопка не знаю</div>
            <div>Кнопка знаю</div>

            <div>Кнопка перемешивания</div>
        </>
    )
})

export { CardsModePage }