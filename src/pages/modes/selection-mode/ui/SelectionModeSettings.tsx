
import { observer} from 'mobx-react-lite'
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';
import { SelectionModeStore } from "features/modes/selection-mode/model/SelectionModeStore";
import React, { useEffect, useState } from "react";

interface IProps {
    selectionModeStore: SelectionModeStore,
    isShowModal: boolean,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const SelectionModeSettings = observer(( {selectionModeStore, isShowModal, setIsShowModal}: IProps ) => {

    const [isOnlyFavorite, setIsOnlyFavorite] = useState(selectionModeStore.isOnlyFavorite)

    useEffect(() => {
        setIsOnlyFavorite(selectionModeStore.isOnlyFavorite)
    }, [isShowModal])

    const handleChange = () => {
        setIsOnlyFavorite(prev => !prev)
    }

    const handleAccept = () => {
        selectionModeStore.switchOnlyFavorite(isOnlyFavorite)
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
                                onChange={handleChange}
                                disabled={!selectionModeStore.isOnlyFavoriteAcceptable}/>
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

