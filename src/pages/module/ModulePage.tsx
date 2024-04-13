import { useParams } from "react-router-dom"
import { useState, useContext } from "react";
import { observer } from 'mobx-react-lite'
import Alert from '@mui/material/Alert';
import { TextField } from "@mui/material";

import { ModuleStore, CardStore } from 'entities/module'
import { CardItem } from 'entities/module/ui/CardItem'

import { ModesBlock } from 'features/navigation';

import { useAbortController } from 'entities/session';
import { useInitModule } from './model/useInitModule';
import { CircularLoader } from "shared/ui/loaders/CircularLoader";

import { ModuleActionsDrawer } from './ui/ModuleActionsDrawer';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';

import { UserData } from "features/profile/UserData";

interface IProps {
    moduleStore: ModuleStore,
    cardStore: CardStore,
}

const ModulePage = () => {
    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : null
    if (!moduleId) return

    const { moduleStore, cardStore } = useInitModule(moduleId)

    if (!moduleStore || !cardStore) return <CircularLoader/>

    return <ObservedModulePage moduleStore={moduleStore} cardStore={cardStore}/>
}

const ObservedModulePage = observer(( { moduleStore, cardStore }: IProps ) => {
    useAbortController([moduleStore, cardStore])

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


    const [isShowModal, setIsShowModal] = useState(false)
    const STATIC_URL = import.meta.env.VITE_LBC_SERVER_STATIC_URL
    const avatarUrl = module?.options.createdByAvatarUrl
    const login = module?.options.createdByLogin

    return(
        <>
        <div className='w-3/5 ml-auto mr-auto p-4 md-max:w-full md-max:p-2'>
            <div className="flex gap-2 py-1 mb-2">
                <div className="flex gap-2 bg-gray-200 rounded-md px-2 py-1 items-center" >
                    <div className={`flex items-center ${module?.options.isBookmarked ? 'text-blue-400' : 'text-gray-300'}`}>
                        <BookmarkIcon sx={{width: 20, height: 20}}/>
                    </div>
                    <div className={`flex items-center ${module?.isPublished ? 'text-blue-400' : 'text-gray-300'}`}>
                        <PublicIcon sx={{width: 20, height: 20}}/>
                    </div>
                </div>
                <div className={`flex-auto text-center text-lg border-[1px] rounded-lg`}>Модуль</div>
                <div className="flex  justify-end" onClick={() => setIsShowModal(true)}>
                    <div className={`flex items-center text-gray-400`}><SettingsIcon sx={{width: 30, height: 30}}/></div>
                </div>
            </div>
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
            <div className='grid grid-cols-2 gap-2 mb-4'>
                <ModesBlock />
            </div>
            <div className="flex gap-4 items-center mb-4">
                <div>
                    <UserData
                        avatarUrl={avatarUrl ? `${STATIC_URL}/${avatarUrl}` : undefined}
                        login={login ?? undefined}
                    />
                </div>
                <div className="relative flex items-center">
                    <span className="w-[1px] h-8 bg-gray-300"></span>
                </div>
                <div>
                    <h2 className='font-semibold text-lg text-slate-800'>Термины в модуле: {cards.length}</h2>
                </div>
            </div>

            <div className="pb-20">
                { cards.length ? cards.map((card, idx) => (
                    <div className='mb-3' key={card.id} id={card.id.toString()}>
                        <CardItem
                            termin={card.term || ''}
                            definition={card.definition || ''}
                            imgUrl={card.imgUrl || ''}
                            cardId={card.id}
                            cardIdx={idx}
                            isOwner={module?.options.isOwner}
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
        <ModuleActionsDrawer
                module={module}
                isShowModal={isShowModal}
                setIsShowModal={setIsShowModal}
                moduleStore={moduleStore}/>
        </>
    )
})

export { ModulePage }

