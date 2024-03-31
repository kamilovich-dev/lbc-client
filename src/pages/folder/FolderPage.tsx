import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite'
import Alert from '@mui/material/Alert';
import { TextField } from "@mui/material";

import { ModuleItem } from "entities/module";

import { useAbortController } from 'entities/session';
import { useInitFolder } from './model/useInitFolder';
import { CircularLoader } from "shared/ui/loaders/CircularLoader";

import { FolderActionsDrawer } from './ui/FolderActionsDrawer';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';

import { UserData } from "features/profile/UserData";
import { FolderStore } from "entities/folder";
import { FolderEditModal } from "features/folder-edit/FolderEditModal";

interface IProps {
    folderStore: FolderStore,
    folderId: number,
}

export const FolderPage = () => {

    const routeParams = useParams();
    const folderId = routeParams.folderId ? parseInt(routeParams.folderId) : null
    if (!folderId) return

    const { folderStore } = useInitFolder(folderId)

    if (!folderStore) return <CircularLoader/>

    return <ObservedFolderPage folderStore={folderStore} folderId={folderId}/>
}

const ObservedFolderPage = observer(( { folderStore, folderId }: IProps ) => {

    useAbortController([folderStore])

    const folder = folderStore.getFolderById(folderId)
    if (!folder) return

    const modules = folderStore.modules

    const createdAtString = folder?.createdAt ? new Date(folder.createdAt).toLocaleString() : ''
    const updatedAtString = folder?.updatedAt ? new Date(folder.updatedAt).toLocaleString() : ''

    const [isShowActionsModal, setIsShowActionsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const STATIC_URL = import.meta.env.VITE_LBC_SERVER_STATIC_URL
    const avatarUrl = folder?.options.createdByAvatarUrl
    const login = folder?.options.createdByLogin

    const handleEditClick = () => {
        setIsShowActionsModal(false)
        setIsShowEditModal(true)
    }

    return(
        <>
        <div className='w-3/5 ml-auto mr-auto p-4 md-max:w-full md-max:p-2'>
            <div className="flex gap-2 py-1 mb-2">
                <div className="flex gap-2 bg-gray-200 rounded-md px-2 py-1 items-center" >
                    <div className={`flex items-center ${folder?.options.isBookmarked ? 'text-blue-400' : 'text-gray-300'}`}>
                        <BookmarkIcon sx={{width: 20, height: 20}}/>
                    </div>
                    <div className={`flex items-center ${folder?.isPublished ? 'text-blue-400' : 'text-gray-300'}`}>
                        <PublicIcon sx={{width: 20, height: 20}}/>
                    </div>
                </div>
                <div className="flex flex-auto justify-end" onClick={() => setIsShowActionsModal(true)}>
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
                            value={folder?.name ?? ''}
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
                            value={folder?.description ?? ''}
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
                    <h2 className='font-semibold text-lg text-slate-800'>Модулей в папке: {modules.length}</h2>
                </div>
            </div>

            <div className="pb-20">
                { modules.length ? modules.map((module, idx) => (
                    <div className='mb-3' key={module.id} id={module.id.toString()}>
                        <ModuleItem
                            module={module}
                        />
                    </div>
                )) :
                <Alert severity="info" sx={{ width: '100%' }}>
                    Модули не найдены!
                </Alert> }
            </div>
        </div>
        <FolderActionsDrawer
            folder={folder}
            folderStore={folderStore}
            isShowModal={isShowActionsModal}
            setIsShowModal={setIsShowActionsModal}
            handleEditClick={handleEditClick}/>

        <FolderEditModal
            folder={folder}
            folderStore={folderStore}
            isShowModal={isShowEditModal}
            setIsShowModal={setIsShowEditModal}/>
        </>
    )
})


