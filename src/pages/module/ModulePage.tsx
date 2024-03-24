import { useParams } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import Alert from '@mui/material/Alert';
import { TextField } from "@mui/material";

import { ModuleStore, CardStore } from 'entities/module'
import { CardShowRow } from './ui/CardShowRow'

import { ModesBlock } from 'features/navigation';

import { useEditCardListener } from './model/useEditCardListener'
import { useAbortController } from 'entities/module';
import { useInitModule } from './model/useInitModule';
import { CircularLoader } from "shared/ui/loaders/CircularLoader";

interface IProps {
    moduleStore: ModuleStore
    cardStore: CardStore
}

const ModulePage = () => {
    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : null
    if (!moduleId) return

    const {moduleStore, cardStore} = useInitModule(moduleId)

    if (!moduleStore || !cardStore) return <CircularLoader/>

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

    const createdAtString = module?.createdAt ? new Date(module.createdAt).toLocaleString() : ''
    const updatedAtString = module?.updatedAt ? new Date(module.updatedAt).toLocaleString() : ''

    return(
        <>
        <div className='w-3/5 ml-auto mr-auto p-4 md-max:w-full md-max:p-2'>
            <div className='mb-1 overflow-hidden'>
                    <div className='font-normal text-xs text-slate-400 mb-1'>
                        Название
                    </div>
                    <div>
                        <TextField
                            multiline
                            fullWidth
                            inputProps={{style: { fontWeight:'500', textAlign: 'left', fontSize: 14, lineHeight: 1.2 }}}
                            InputProps={{ disableUnderline: true, readOnly: true}}
                            sx={{"& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: 'black'},
                                '& :hover': { cursor: 'pointer' }}}
                            name='term'
                            variant="standard"
                            value={module?.name}
                        />
                    </div>
            </div>
            <div className="h-[1px] bg-gray-200 w-full mb-4"></div>
            <div className='mb-1 overflow-hidden'>
                    <div className='font-normal text-xs text-slate-400 mb-1'>
                        Описание
                    </div>
                    <div className='font-semibold text-md text-slate-600'>
                        <TextField
                            multiline
                            fullWidth
                            inputProps={{style: { fontWeight:'400', textAlign: 'left', fontSize: 14, lineHeight: 1.2 }}}
                            InputProps={{ disableUnderline: true, readOnly: true}}
                            sx={{"& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: 'black'},
                                '& :hover': { cursor: 'pointer' }}}
                            name='term'
                            variant="standard"
                            value={module?.description}
                        />
                    </div>
            </div>
            <div className="h-[1px] bg-gray-200 w-full mb-4"></div>
            <div className='mb-1'>
                    <div className='font-normal text-xs text-slate-400 mb-1'>
                        Создан: {createdAtString}
                    </div>
                    <div className='font-normal text-xs text-slate-400'>
                        Изменен: {updatedAtString}
                    </div>
            </div>
            <div className="h-[1px] bg-gray-200 w-full mb-4"></div>
            <div className='grid grid-cols-2 gap-2 mb-5'>
                <ModesBlock />
            </div>
            <h2 className='font-semibold text-lg text-slate-800 mb-5'>Термины в модуле: {cards.length}</h2>
            <div className="pb-20">
                { cards.length ? cards.map((card, idx) => (
                    <div className='mb-3' key={card.id} id={card.id.toString()}>
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
        </div>

        </>
    )
})

export { ModulePage }

