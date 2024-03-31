import { useNavigate, generatePath } from "react-router-dom"
import { routePaths } from "shared/config";
import Drawer from '@mui/material/Drawer';
import { TFolder } from "shared/api/lbc-server/endpoints/types/folder";
import { FolderStore } from "entities/folder";

interface IDrawerProps {
    folder: TFolder | undefined,
    folderStore: FolderStore
    isShowModal: boolean,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>

    handleEditClick: () => void
}

export const FolderActionsDrawer = ( {folder, folderStore, isShowModal, setIsShowModal, handleEditClick}: IDrawerProps) => {

    const navigate = useNavigate();

    if (!folder) return

    const handlePublicateClick = (folder: TFolder) => {
        folderStore.updateFolder( {folder, field: 'isPublished', value: '' } )
        setIsShowModal(false)
    }

    const handleRemoveFolderBookmarkClick = (folderId: number) => {
        folderStore.deleteBookmarkByFolderId( folderId )
        .then(result => {
            if (!result?.isError) navigate(routePaths.FOLDERS)
            setIsShowModal(false)
        })
    }

    const handleCreateFolderBookmarkClick = (folderId: number) => {
        folderStore.createBookmarkByFolderId( folderId )
        setIsShowModal(false)
    }

    const handleRemoveFolderClick = (folderId: number) => {
        folderStore.removeFolder(folderId)
        .then(result => {
            if (!result?.isError) navigate(routePaths.FOLDERS)
            setIsShowModal(false)
        })
    }

    const handleModulesAddToFolderClick = ( folder: TFolder ) => {
        navigate(generatePath(routePaths.MODULES_ADD_TO_FOLDER, { folderId: String(folder.id) ?? '' }))
    }

    return (
        <div>
            <Drawer
                open={isShowModal}
                onClose={() => setIsShowModal(false)}
                anchor="bottom"
            >
                <div className="bg-white p-4">
                    {folder.options.isOwner ?
                    <>
                        <div className="flex items-center mb-2">
                            <button className="text-md text-gray-500 flex-auto text-center"
                                onClick={() => handlePublicateClick(folder)}>{folder.isPublished ? 'Сделать приватным' : 'Опубликовать'}</button>
                        </div>
                        <div className="border-b-2 border-gray-200 w-full mb-4"></div>
                    </> : null}

                    {folder.options.isOwner?
                        null :
                    <>
                        {folder.options.isBookmarked ?
                        <>
                            <div className="flex items-center mb-2">
                                <button className="text-md text-gray-500 flex-auto text-center"
                                    onClick={() => handleRemoveFolderBookmarkClick(folder.id)}>Исключить из сохраненных</button>
                            </div>
                        </>:
                        <>
                            <div className="flex items-center mb-2">
                                <button className="text-md text-gray-500 flex-auto text-center"
                                    onClick={() => handleCreateFolderBookmarkClick(folder.id)}>Сохранить себе</button>
                            </div>
                        </>}
                    </>}

                    {folder.options.isOwner ?
                    <>
                        <div className="flex items-center mb-2">
                            <button className="text-md text-gray-500 flex-auto text-center"
                                onClick={handleEditClick}>Редактировать</button>
                        </div>
                        <div className="border-b-2 border-gray-200 w-full mb-4"></div>
                    </> : null}

                    {folder.options.isOwner ?
                        <>
                            <div className="flex items-center mb-2">
                            <button className="text-md text-red-500 flex-auto text-center"
                                onClick={() => handleRemoveFolderClick(folder.id)}>Удалить</button>
                            </div>
                            <div className="border-b-2 border-gray-200 w-full mb-4"></div>
                        </> : null}

                    {folder.options.isOwner ?
                        <>
                            <div className="flex items-center mb-2">
                            <button className="text-md text-gray-500 flex-auto text-center"
                                onClick={() => handleModulesAddToFolderClick(folder)}>Добавить модули</button>
                            </div>
                        </> : null}
                </div>
            </Drawer>
        </div>
    )
}