import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import Alert from '@mui/material/Alert';

import { ToModulesButton } from 'features/navigation'

import { ICardStore, IModuleStore, ModuleStore, CardStore } from 'entities/module'
import { CardShowRow } from './ui/CardShowRow'

import { ModesBlock } from 'features/navigation';


interface IProps {
    moduleStore: IModuleStore
    cardStore: ICardStore
}

const ModulePage = () => {
    const moduleStore = new ModuleStore()
    const cardStore = new CardStore();
    return <_ModulePage moduleStore={moduleStore} cardStore={cardStore}/>
}

const _ModulePage = observer(( { moduleStore, cardStore }: IProps ) => {
    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : null
    const [isEditModes, setEditModes] = useState<Array<boolean>>([])

    if (!moduleId) return

    useEffect( () => { //Инициалищация данных
        moduleStore.refreshModules()
        cardStore.refreshCards(moduleId)
    }, [])

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

    const module = moduleStore.getModuleById(moduleId)
    if (!module) return

    const cards = cardStore.cards
    if (!cards) return

    const handleSwitchEditMode = ( cardIdx: number ) => {
        const newIsEditModes = [...isEditModes]
        newIsEditModes[cardIdx] = !newIsEditModes[cardIdx]
        setEditModes(newIsEditModes)
    }

    const handleEditCard = (cardId: number, name: string, value: string) => {
        cardStore.editCard( { cardId, moduleId, name, value } )
    }

    const handleSwitchFavorite = (cardId: number) => {
        cardStore.editCard( { cardId, moduleId, isSwitchFavorite: true } )
    }

    return(
        <>
            <div className='mb-4'>
               <ToModulesButton/>
            </div>
            <h1 className='font-bold text-xl text-slate-800 mb-5'>{module.name}</h1>
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
        </>
    )
})

export { ModulePage }

