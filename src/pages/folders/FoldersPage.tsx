import { LibraryHeader } from "features/navigation/library/LibraryHeader"
import { useAbortController } from 'entities/session';
import { FolderStore } from "entities/folder"
import { observer } from "mobx-react-lite"
import { useState, useEffect } from "react";
import { CircularLoader } from "shared/ui/loaders/CircularLoader";
import { Alert } from '@mui/material';
import { ListFolders } from "./ui/ListFolders";
import { FolderListHeader } from "./ui/FolderListHeader";

interface IProps {
    folderStore: FolderStore
}

const ObbservedFolderPage = observer(( {folderStore}: IProps ) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        folderStore.refreshFolders()
        .then(() => setIsLoading(false))
    }, [])

    return (
        <>
            <div className='p-2 m-auto pt-16 w-full'>
                <div className='bg-blue-50 rounded-md min-h-screen'>
                    <div className='mb-2'>
                        <LibraryHeader/>
                    </div>
                    <FolderListHeader folderStore={folderStore}/>
                    {isLoading && folderStore.client.isLoading ?
                        <><CircularLoader/></> :
                        <div className='pb-20'>
                            {folderStore.folders.length ?
                                <ListFolders
                                    folderStore={folderStore}/>
                                : <Alert severity="info" sx={{ width: '100%' }}>
                                    Папки не найдены!
                                </Alert>
                            }
                        </div>}
                </div>
            </div>
            <LibraryHeader/>
        </>
    )
})

export const FoldersPage = () => {
    const folderStore = new FolderStore()
    useAbortController( [folderStore] )
    return <ObbservedFolderPage folderStore={folderStore}/>
}