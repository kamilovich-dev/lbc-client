import { useParams } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import Alert from '@mui/material/Alert';

import { ModuleStore, CardStore } from 'entities/module'
import { CardShowRow } from './ui/CardShowRow'

import { ModesBlock } from 'features/navigation';
import { TextString } from 'shared/ui/texts/TextString';

import { useEditCardListener } from './model/useEditCardListener'

import { useAbortController } from 'entities/module';
import { useInitModule } from './model/useInitModule';
import { SkeletonLoader } from './ui/SkeletonLoader';

interface IProps {
    moduleStore: ModuleStore
    cardStore: CardStore
}

const ModulePage = () => {
    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : null
    if (!moduleId) return

    const {moduleStore, cardStore} = useInitModule(moduleId)

    if (!moduleStore || !cardStore) return <SkeletonLoader/>

    return <ObservedModulePage moduleStore={moduleStore} cardStore={cardStore}/>
}

const ObservedModulePage = observer(( { moduleStore, cardStore }: IProps ) => {
    useAbortController([moduleStore, cardStore])
    const {isEditModes, handleSwitchEditMode}= useEditCardListener(cardStore)

    const module = moduleStore.getModuleById(cardStore.moduleId)
    const cards = cardStore.cards

    const handleEditCard = (cardId: number, name: string, value: string) => {
        cardStore.editCard( { cardId, name, value } )
    }

    const handleSwitchFavorite = (cardId: number) => {
        cardStore.editCard( { cardId, isSwitchFavorite: true } )
    }

    return(
        <>
        <div className='w-3/5 ml-auto mr-auto p-4'>
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
        </div>

        </>
    )
})

export { ModulePage }

