import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import Alert from '@mui/material/Alert';

import { ModuleStore, CardStore } from 'entities/module'
import { CardShowRow } from './ui/CardShowRow'

import { ModesBlock } from 'features/navigation';
import { TextString } from 'shared/ui/texts/TextString';

import { useEditCardListener } from './model/useEditCardListener'
import { ListSkeleton } from 'shared/ui/skeletons/ListSkeleton';

import { useAbortController } from 'entities/module';

interface IProps {
    moduleStore: ModuleStore
    cardStore: CardStore
}

const ModulePage = () => {
    const moduleStore = new ModuleStore()
    const cardStore = new CardStore();
    useAbortController({ storesWithClient: [moduleStore, cardStore] })
    return <ObservedModulePage moduleStore={moduleStore} cardStore={cardStore}/>
}

const ObservedModulePage = observer(( { moduleStore, cardStore }: IProps ) => {
    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : null
    const {isEditModes, handleSwitchEditMode}= useEditCardListener(cardStore)

    if (!moduleId) return

    useEffect( () => { //Инициалищация данных
        moduleStore.refreshModules()
            .then(() => cardStore.refreshCards(moduleId))
    }, [])

    const module = moduleStore.getModuleById(moduleId)
    const cards = cardStore.cards

    const handleEditCard = (cardId: number, name: string, value: string) => {
        cardStore.editCard( { cardId, moduleId, name, value } )
    }

    const handleSwitchFavorite = (cardId: number) => {
        cardStore.editCard( { cardId, moduleId, isSwitchFavorite: true } )
    }

    return(
        <>
        <div className='w-3/5 m-auto p-4'>
            {moduleStore.client.isLoading || cardStore.client.isLoading ?
            <>
                <ListSkeleton/>
            </> :
            <>
            <div className='mb-2'>
                {       <TextString
                        customClassName='font-bold text-xl text-slate-800 mb-5'
                        maxLength={64}
                        text={module?.name || ''}
                    />
                }
            </div>
            <div className='flex items-center gap-2 mb-5'>
                <ModesBlock />
            </div>
            <h2 className='font-semibold text-xl text-slate-800 mb-5'>Термины в модуле: {cards.length}</h2>
            { cards.length ? cards.map((card, idx) => (
                <div className='mb-2' key={card.id} id={card.id.toString()}>
                    <CardShowRow
                        termin={card.term || ''}
                        definition={card.definition || ''}
                        imgUrl={card.imgUrl || ''}
                        cardId={card.id}
                        cardIdx={idx}
                        isEditMode={isEditModes[idx]}
                        handleSwitchEditMode={handleSwitchEditMode}
                        handleEditCard={handleEditCard}
                        handleSwitchFavorite={handleSwitchFavorite}
                        isFavorite={card.isFavorite || false}
                    />
                </div>

            )) :
            <Alert severity="info" sx={{ width: '100%' }}>
                Карточки не найдены!
            </Alert> }
            </>}
        </div>

        </>
    )
})

export { ModulePage }

