import { ModuleStore } from "entities/module"
import { TModule } from "shared/api/lbc-server/endpoints/types/modules";
import { useNavigate } from "react-router-dom"
import { routePaths } from "shared/config";
import Drawer from '@mui/material/Drawer';

interface IDrawerProps {
    module: TModule | undefined,
    isShowModal: boolean,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
    moduleStore: ModuleStore
}

const ModuleActionsDrawer = ( {module, setIsShowModal, moduleStore, isShowModal}: IDrawerProps) => {
    const navigate = useNavigate();

    if (!module) return

    const handlePublicateClick = (module: TModule) => {
        moduleStore.editModule( {id: module.id, name: 'isPublished', value: '' } )
        setIsShowModal(false)
    }

    const handleRemoveModuleBookmarkClick = (moduleId: number) => {
        moduleStore.deleteBookmarkByModuleId( moduleId )
        .then(result => {
            if (!result?.isError) navigate(routePaths.MODULES)
            setIsShowModal(false)
        })
    }

    const handleCreateModuleBookmarkClick = (moduleId: number) => {
        moduleStore.createBookmarkByModuleId( moduleId )
        setIsShowModal(false)
    }

    const handleEditClick = ( moduleId: number) => {
        navigate(`/${moduleId}/edit`)
    }

    const handleRemoveModuleClick = (moduleId: number) => {
        moduleStore.deleteModuleById(moduleId)
        .then(result => {
            if (!result?.isError) navigate(routePaths.MODULES)
            setIsShowModal(false)
        })
    }

    const handleAddToFolderClick = (module: TModule) => {
        navigate(`/${module.id}`)
    }

    return (
        <div>
            <Drawer
                open={isShowModal}
                onClose={() => setIsShowModal(false)}
                anchor="bottom"
            >
                <div className="bg-white p-4">
                    {module.options.isOwner ?
                    <>
                        <div className="flex items-center mb-2">
                            <button className="text-md text-gray-500 flex-auto text-center"
                                onClick={() => handlePublicateClick(module)}>{module.isPublished ? 'Сделать приватным' : 'Опубликовать'}</button>
                        </div>
                        <div className="border-b-2 border-gray-200 w-full mb-4"></div>
                    </> : null}

                    {module.options.isOwner?
                        null :
                    <>
                        {module.options.isBookmarked ?
                        <>
                            <div className="flex items-center mb-2">
                                <button className="text-md text-gray-500 flex-auto text-center"
                                    onClick={() => handleRemoveModuleBookmarkClick(module.id)}>Исключить из сохраненных</button>
                            </div>
                        </>:
                        <>
                            <div className="flex items-center mb-2">
                                <button className="text-md text-gray-500 flex-auto text-center"
                                    onClick={() => handleCreateModuleBookmarkClick(module.id)}>Сохранить себе</button>
                            </div>
                        </>}
                    </>}

                    {module.options.isOwner ?
                    <>
                        <div className="flex items-center mb-2">
                            <button className="text-md text-gray-500 flex-auto text-center"
                                onClick={() => handleEditClick(module.id)}>Редактировать</button>
                        </div>
                        <div className="border-b-2 border-gray-200 w-full mb-4"></div>
                    </> : null}


                    {module.options.isOwner ?
                        <>
                            <div className="flex items-center mb-2">
                            <button className="text-md text-red-500 flex-auto text-center"
                                onClick={() => handleRemoveModuleClick(module.id)}>Удалить</button>
                            </div>
                            <div className="border-b-2 border-gray-200 w-full mb-4"></div>
                        </> : null}

                    {module.options.isOwner ?
                        <>
                            <div className="flex items-center mb-2">
                            <button className="text-md text-gray-500 flex-auto text-center"
                                onClick={() => handleAddToFolderClick(module)}>Добавить в папку</button>
                            </div>
                        </> : null}
                </div>
            </Drawer>
        </div>
    )
}

export {  ModuleActionsDrawer }