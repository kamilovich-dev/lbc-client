import { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import { observer } from "mobx-react-lite"

import { ModesMenu, BackButton } from "features/navigation"

import { CardStore, ModuleStore } from "entities/module"

import { CardsModeStore } from "features/modes/cards-mode"
import SettingsIcon from '@mui/icons-material/Settings';

import { FlipCard } from "features/modes/cards-mode"

import { CardsNavigation } from "features/modes/cards-mode";
import { SortedNavigation } from "features/modes/cards-mode";
import { SortedCounterKnown } from "features/modes/cards-mode";
import { SortedCounterUnknown } from "features/modes/cards-mode";
import { Cancel } from "features/modes/cards-mode";

import { Autoplay } from "features/modes/cards-mode";
import { Mix } from "features/modes/cards-mode";

import { ParametersModal } from "features/modes/cards-mode";

import { Result } from 'features/modes/cards-mode';
import { ProgressBar } from "features/modes/cards-mode";
import { TextString } from "shared/ui/texts/TextString";
import { CardsNotFound } from "./ui/CardsNotFound";

import { useInitCardsMode } from "./model/useInitCardsMode";

import { useHotkeysListener } from "./model/useHotkeysListener";
import { useAbortController } from 'entities/session';
import { CircularLoader } from "shared/ui/loaders/CircularLoader";

const CardsModePage = () => {
    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : null
    if (!moduleId) return

    const { moduleStore, cardStore, cardsModeStore } = {...useInitCardsMode(moduleId)}

    if (!moduleStore || !cardStore || !cardsModeStore) return <CircularLoader/>

    return (
        <ObserverCardsModePage
            cardsModeStore={cardsModeStore}
            cardStore={cardStore}
            moduleStore={moduleStore}/>
    )
}

interface IProps {
    cardStore: CardStore,
    cardsModeStore: CardsModeStore,
    moduleStore: ModuleStore
}

const ObserverCardsModePage = observer(( { cardStore, cardsModeStore, moduleStore }: IProps ) => {
    const cardRef = useRef(null)
    const nextRef = useRef(null)

    useAbortController([moduleStore, cardStore])
    useHotkeysListener(cardsModeStore)

    const [isShowParametersModal, setIsShowParametersModal] = useState(false)

    const module = moduleStore.getModuleById(cardStore.moduleId)
    if (!module) return

    return (
        <>
            {cardsModeStore.cards.length > 0 ?
            <>
            <div className="flex gap-2 relative w-full bg-white p-1">
                    <div className="w-1/6  flex  items-start">
                        {/* <ModesMenu/> */}
                    </div>
                    <div className="w-4/6 flex-row ">
                        <div className="text-center text-md font-semibold text-slate-700">
                            {cardsModeStore.currentIdx + 1} / {cardsModeStore.cards.length}
                        </div>
                        <TextString
                            text={module?.name}
                            maxLength={32}
                            customClassName="text-center text-md font-bold text-slate-700"
                        />
                    </div>
                    <div className="w-1/6 flex gap-2 justify-end items-center">
                        <Button variant='text' onClick={() => setIsShowParametersModal(true)} size='small'>
                                <SettingsIcon sx={{height:30, width:30}} className="text-slate-400"/>
                        </Button>
                    </div>
            </div>
            <div className="mb-1">
                <ProgressBar current={cardsModeStore.currentIdx} max={cardsModeStore.cards.length} resultShown={cardsModeStore.resultShown}/>
            </div>
            <div className='overflow-hidden flex-auto flex flex-col w-3/5 mx-auto p-4 md-max:w-full'>
                {cardsModeStore.resultShown ?
                    <div className='mx-auto'>
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
                        <div className="flex flex-auto mb-4 bg-gray-300 rounded-xl">
                            <FlipCard
                                moduleId={module.id}
                                cardsModeStore={cardsModeStore}
                                cardStore={cardStore}
                                externalRef={cardRef}
                                isOwner={module.options.isOwner}/>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gridTemplateRows: '1fr'}}>
                            <div>
                                {cardsModeStore.cardsSorted && cardsModeStore.currentIdx > 0 ? <Cancel handleClick={cardsModeStore.cancelCard}/>
                                    : cardsModeStore.cardsSorted ? null
                                    : <Autoplay handleClick={() => cardsModeStore.autoplay([cardRef, nextRef])} isPlaying={cardsModeStore.autoplayOn}/>}
                            </div>
                            <div className="flex gap-8 justify-center">
                                {cardsModeStore.cardsSorted ?
                                    <SortedNavigation isAccept={false} handleClick={cardsModeStore.markCardAsUnknown} />
                                    : <CardsNavigation isNext={false} handleClick={cardsModeStore.goPrevCard}/>}
                                {cardsModeStore.cardsSorted ?
                                    <SortedNavigation isAccept={true} handleClick={cardsModeStore.markCardAsKnown} />
                                    : <CardsNavigation isNext={true} handleClick={cardsModeStore.goNextCard} externalRef={nextRef}/>}
                            </div>
                            <div className="flex  justify-end">
                                <Mix handleClick={cardsModeStore.mixCards} isMixed={cardsModeStore.cardsMixed}/>
                            </div>
                        </div>

                    </>
                }

            </div>
            </> :
            <>
                <CardsNotFound/>
            </>}
            <ParametersModal
                cardsModeStore={cardsModeStore}
                showModal={isShowParametersModal}
                setShowModal={setIsShowParametersModal}/>
        </>
    )
})

export { CardsModePage }