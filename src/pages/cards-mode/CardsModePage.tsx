import { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"
import Alert from '@mui/material/Alert';

import { ModesMenu, BackButton } from "features/navigation"

import { CardStore, ModuleStore,
        TModule } from "entities/module"

import { CardsModeStore } from "features/cards-mode"

import { ParametersButton } from 'features/cards-mode/ui/ParametersButton'
import { FlipCard } from "features/cards-mode"


const CardsModePage = () => {
    const { moduleId } = useParams()
    if (!moduleId) return;

    const [module, setModule] = useState<TModule | undefined>(undefined)
    const [cardStore, setCardStore] = useState<CardStore | undefined>(undefined)

    useEffect( () => {
        const asyncModuleStore = new ModuleStore()
        const asyncCardStore = new CardStore()

        asyncModuleStore.refreshModules()
            .then(() => setModule(asyncModuleStore.getModuleById(parseInt(moduleId))) )

        asyncCardStore.refreshCards(parseInt(moduleId))
            .then(() => setCardStore({...asyncCardStore}))

    }, [])

    if (!cardStore?.cards.length || !module) return (
        <>
            <div className="flex gap-4">
                <div className="w-3/4">
                    <Alert severity="info" sx={{ width: '100%' }}>
                        Карточки не найдены!
                    </Alert>
                </div>
                <div>
                    <BackButton/>
                </div>
            </div>
        </>
    )

    const cardsModeStore = new CardsModeStore(cardStore.cards)

    return (
        <_CardsModePage cardsModeStore={cardsModeStore} module={module} cardStore={cardStore}/>
    )
}

interface IProps {
    cardStore: CardStore,
    cardsModeStore: CardsModeStore,
    module: TModule
}


const _CardsModePage = observer(( { cardStore, cardsModeStore, module }: IProps ) => {

    return (
        <>
            <div className='flex flex-col max-w-4xl m-auto'>

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

                <div className="mb-4 h-[700px]">
                    <FlipCard
                        moduleId={module.id}
                        cardsModeStore={cardsModeStore}
                        cardStore={cardStore}/>
                </div>


                <div>Автовоспроизведение</div>
                <div>Кнопки навигации</div>

                <div>Счетчик еще изучаю</div>
                <div>Счетчик знаю</div>
                <div>Отменить</div>
                <div>Кнопка не знаю</div>
                <div>Кнопка знаю</div>

                <div>Кнопка перемешивания</div>
            </div>
        </>
    )
})

export { CardsModePage }