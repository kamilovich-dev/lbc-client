import { FolderStore } from "entities/folder"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CircularLoader } from "shared/ui/loaders/CircularLoader"
import { ModuleItem, ModuleStore } from "entities/module"
import { useInitAddToFolder } from "./model/useInitAddToFolder"

export const AddToFolderPage = (  ) => {

    const routeParams = useParams();
    const folderId = routeParams.folderId ? parseInt(routeParams.folderId) : undefined
    const { folderStore, moduleStore } = useInitAddToFolder(folderId)

    if (!folderId) return
    if (!folderStore || !moduleStore) return
    if (folderStore.client.isLoading || moduleStore.client.isLoading) return <CircularLoader/>

    return <ObserverAddToFolderPage folderStore={folderStore} moduleStore={moduleStore}/>
}

interface IProps {
    folderStore: FolderStore,
    moduleStore: ModuleStore,
}

const ObserverAddToFolderPage = observer(({folderStore, moduleStore}: IProps) => {

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const moduleIds = folderStore.modules.map(module => module.id)
        setSelectedIds(moduleIds)
    }, [])

    const handleClick = (moduleId: number) => {

        const _selectedIds = [...selectedIds]
        const idx = _selectedIds.findIndex(id => id === moduleId)

        if (idx !== -1) {
            _selectedIds.splice(idx, 1)
            setSelectedIds(_selectedIds)
        }  else setSelectedIds([..._selectedIds, moduleId])
    }

    const handleAccept = async () => {
        const promises = selectedIds.map(id => {

        })
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="p-2 relative">
                <div className=" text-gray-500 font-semibold mb-2">Выберите модули:</div>
                <div className=" gap-2 grid grid-cols-2 mb-2 pb-20">
                    { moduleStore.modules.map(module => (
                        <div key={module.id} onClick={() => handleClick(module.id)}
                            className={`border-2 ${selectedIds.find(id => id === module.id) ? 'border-blue-400' : ''}` }>
                            <ModuleItem module={module} isHidePublicIcon={true} isHideBookmarkIcon={true}/>
                        </div>
                    )) }
                </div>
                <div className="p-4 fixed bottom-14 bg-white rounded-lg w-full ">
                    <div className="text-gray-500 font-semibold mb-2">
                        Выбрано модулей: {selectedIds.length}
                    </div>
                    <div className="flex justify-start gap-4">
                        <button
                            className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600'
                            onClick={handleAccept}>
                            Сохранить
                        </button>
                        <button
                            className='border-blue-400 border-[1px] drop-shadow-sm rounded-lg p-2 w-32 text-center text-blue-400 hover:border-blue-500 active:border-blue-600'
                            onClick={handleCancel}>
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
})