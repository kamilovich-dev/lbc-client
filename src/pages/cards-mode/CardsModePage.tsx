import { useState, useEffect, useRef } from "react"
import Button from '@mui/material/Button';
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"
import Alert from '@mui/material/Alert';

import { ModesMenu, BackButton } from "features/navigation"

import { CardStore, ModuleStore,
        TModule } from "entities/module"

import { CardsModeStore } from "features/cards-mode"

import { FlipCard } from "features/cards-mode"

import { CardsNavigation } from "features/cards-mode";
import { SortedNavigation } from "features/cards-mode";
import { SortedCounterKnown } from "features/cards-mode";
import { SortedCounterUnknown } from "features/cards-mode";
import { Cancel } from "features/cards-mode";

import { Autoplay } from "features/cards-mode";
import { Mix } from "features/cards-mode";

import { ParametersModal } from "features/cards-mode";

import { Result } from 'features/cards-mode';
import { ProgressBar } from "features/cards-mode";


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
        <_CardsModePage cardsModeStore={cardsModeStore} module={module} cardStore={cardStore} />
    )
}

interface IProps {
    cardStore: CardStore,
    cardsModeStore: CardsModeStore,
    module: TModule
}


const _CardsModePage = observer(( { cardStore, cardsModeStore, module }: IProps ) => {

    const cardRef = useRef(null)
    const nextRef = useRef(null)

    const [isShowParametersModal, setIsShowParametersModal] = useState(false)

    return (
        <>
            <div className='flex flex-col max-w-5xl'>
                <div className="mb-2">
                    <ProgressBar current={cardsModeStore.currentIdx} max={cardsModeStore.cards.length} resultShown={cardsModeStore.resultShown}/>
                </div>

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
                        <div>
                        <Button variant='outlined' onClick={() => setIsShowParametersModal(true)} size='small' sx={{fontSize: '14px'}}>
                            Параметры
                        </Button>
                        </div>
                        <div className="w-10">
                            <BackButton />
                        </div>
                    </div>
                </div>

                {cardsModeStore.resultShown ?
                    <div className='max-w-4xl m-auto'>
                        <Result
                            cardsModeStore={cardsModeStore}
                            countOfKnown={cardsModeStore.getCountOfKnown()}
                            countOfUnknown={cardsModeStore.getCountOfUnknown()}/>
                    </div>:
                    <>
                        {cardsModeStore.cardsSorted ? (
                            <div className='flex mb-4'>
                                <div className='flex-auto'>
                                    <SortedCounterUnknown
                                        count={cardsModeStore.getCountOfUnknown()}
                                        unknownText={cardsModeStore.sortedCounterAnimation.unknownText}/>
                                </div>
                                <div>
                                    <SortedCounterKnown
                                        count={cardsModeStore.getCountOfKnown()}
                                        knownText={cardsModeStore.sortedCounterAnimation.knownText}/>
                                </div>
                            </div>
                        ) : null}
                        <div className="mb-3 h-[700px]">
                            <FlipCard
                                moduleId={module.id}
                                cardsModeStore={cardsModeStore}
                                cardStore={cardStore}
                                externalRef={cardRef}/>
                        </div>

                        <div className="flex mb-10">
                            <div className="w-1/3">
                                {cardsModeStore.cardsSorted && cardsModeStore.currentIdx > 0 ? <Cancel handleClick={cardsModeStore.cancelCard}/>
                                    : cardsModeStore.cardsSorted ? null
                                    : <Autoplay handleClick={() => cardsModeStore.autoplay([cardRef, nextRef])} isPlaying={cardsModeStore.autoplayOn}/>}
                            </div>
                            <div className="w-1/3 flex gap-10 justify-center">
                                {cardsModeStore.cardsSorted ?
                                    <SortedNavigation isAccept={false} handleClick={cardsModeStore.markCardAsUnknown} />
                                    : <CardsNavigation isNext={false} handleClick={cardsModeStore.goPrevCard}/>}
                                {cardsModeStore.cardsSorted ?
                                    <SortedNavigation isAccept={true} handleClick={cardsModeStore.markCardAsKnown} />
                                    : <CardsNavigation isNext={true} handleClick={cardsModeStore.goNextCard} externalRef={nextRef}/>}
                            </div>
                            <div className="w-1/3 flex justify-end">
                                <Mix handleClick={cardsModeStore.mixCards} isMixed={cardsModeStore.cardsMixed}/>
                            </div>
                        </div>
                    </>
                }

            </div>

            {isShowParametersModal ? <ParametersModal
                cardsModeStore={cardsModeStore}
                showModal={isShowParametersModal}
                setShowModal={setIsShowParametersModal}/> : null}
        </>
    )
})

export { CardsModePage }