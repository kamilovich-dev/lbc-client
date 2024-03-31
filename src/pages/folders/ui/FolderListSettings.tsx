import Drawer from '@mui/material/Drawer';
import { observer} from 'mobx-react-lite'
import { Select, MenuItem } from '@mui/material';

import { FolderStore } from 'entities/folder';
import React, { useState } from "react";

import type { TFolderSearchParams } from 'shared/api/lbc-server/endpoints/types/folder'

interface IFolderQueyLocal extends Omit<TFolderSearchParams, 'by_search'> {}

interface IProps {
    folderStore: FolderStore,
    isShowModal: boolean,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const FolderListSettings = observer(( {folderStore, isShowModal, setIsShowModal}: IProps ) => {

    const [byAlphabet, setByAlphabet] = useState(folderStore.filters.by_alphabet)
    const [byUpdatedDate, setByUpdatedDate] = useState(folderStore.filters.by_updated_date)

    const handleByAlphabetChange = (value: IFolderQueyLocal['by_alphabet']) => {
        setByAlphabet(value)
        setByUpdatedDate('')
    }

    const handleByUpdatedDateChange = (value: IFolderQueyLocal['by_updated_date']) => {
        setByAlphabet('')
        setByUpdatedDate(value)
    }

    const resetFilters = () => {
        setByAlphabet('')
        setByUpdatedDate('')
    }

    const handleAccept = () => {
        if (byAlphabet) folderStore.setAlphabetFilter(byAlphabet)
        if (byUpdatedDate) folderStore.setUpdatedDateFilter(byUpdatedDate)

        if (!byAlphabet && !byUpdatedDate) folderStore.resetFilters()
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
                    <div className="flex items-center mb-4">
                        <div className="font-bold text-lg text-gray-600 flex-auto">Сортировка</div>
                        <div>
                            <button className="text-blue-400 font-semibold" onClick={resetFilters}>Сбросить всё</button>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="text-md text-gray-500 flex-auto">По алфавиту</div>
                        <div>
                            <Select
                                value={byAlphabet}
                                onChange={e => handleByAlphabetChange(e.target.value as IFolderQueyLocal['by_alphabet'])}
                                size='small'
                            >
                                <MenuItem  value={''}>Не выбрано</MenuItem>
                                <MenuItem  value={'asc'}>A..Z</MenuItem>
                                <MenuItem  value={'desc'}>Z..A</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="text-md text-gray-500 flex-auto">По дате изменения</div>
                        <div>
                            <Select
                                value={byUpdatedDate}
                                onChange={e => handleByUpdatedDateChange(e.target.value as IFolderQueyLocal['by_updated_date'])}
                                size='small'
                            >
                                <MenuItem  value={''}>Не выбрано</MenuItem>
                                <MenuItem  value={'asc'}>Сначала старые</MenuItem>
                                <MenuItem  value={'desc'}>Сначала новые</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="border-b-2 border-gray-200 w-full mb-12"></div>
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

