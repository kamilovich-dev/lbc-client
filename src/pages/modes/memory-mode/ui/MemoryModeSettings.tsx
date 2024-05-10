
import { observer} from 'mobx-react-lite'
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';
import { MemoryModeStore } from 'features/modes/memory-mode';
import { Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from "react";

interface IProps {
    memoryModeStore: MemoryModeStore,
    isShowModal: boolean,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const MemoryModeSettings = observer(( {memoryModeStore, isShowModal, setIsShowModal}: IProps ) => {

    const [isOnlyFavorite, setIsOnlyFavorite] = useState(memoryModeStore.settings.isOnlyFavoriteCards)
    const [whatInAnswer, setWhatInAnswer] = useState(memoryModeStore.settings.whatInAnswer)

    useEffect(() => {
        setIsOnlyFavorite(memoryModeStore.settings.isOnlyFavoriteCards)
        setWhatInAnswer(memoryModeStore.settings.whatInAnswer)
    }, [isShowModal])

    const handleFavoriteChange = () => {
        setIsOnlyFavorite(prev => !prev)
    }

    const handleWhatInAnswerChange = (value: 'term' | 'definition') => {
        setWhatInAnswer(value)
    }

    const handleAccept = () => {
        memoryModeStore.switchIsOnlyFavorite(isOnlyFavorite)
        memoryModeStore.switchWhatInAnswer(whatInAnswer)
        setIsShowModal(false)
    }

    return (
        <>
            <Drawer
                open={isShowModal}
                onClose={() => setIsShowModal(false)}
                anchor="bottom"
            >
                <div className="bg-white p-4">
                    <div className="flex items-center mb-2">
                        <div className="font-bold text-lg text-gray-600 flex-auto">Параметры</div>
                    </div>
                    <div className="flex gap-2 items-center border-b-[1px] border-gray-100 py-4 mb-4">
                        <div className='w-full'>
                            <h2 className='text-gray-500 font-semibold text-lg md-max:text-base'>Изучать только термины с ★</h2>
                        </div>
                        <div>
                            <Switch
                                checked={isOnlyFavorite}
                                onChange={handleFavoriteChange}
                                disabled={!memoryModeStore.settings.isFavoriteAcceptable}/>
                        </div>
                    </div>
                    <div className="flex items-center mb-8">
                        <div className="text-gray-500 font-semibold text-lg md-max:text-base flex-auto">Что в ответе</div>
                        <div>
                            <Select
                                value={whatInAnswer}
                                onChange={e => handleWhatInAnswerChange(e.target.value as 'term' | 'definition')}
                                size='small'
                            >
                                <MenuItem  value={'term'}>Термин</MenuItem>
                                <MenuItem  value={'definition'}>Определение</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600'
                            onClick={handleAccept}>
                            Применить
                        </button>
                        <button
                            className='border-blue-400 border-[1px] drop-shadow-sm rounded-lg p-2 w-32 text-center text-blue-400 hover:border-blue-500 active:border-blue-600'
                            onClick={() => setIsShowModal(false)}>
                            Отмена
                        </button>
                    </div>
                </div>
            </Drawer>
        </>
    )
})

