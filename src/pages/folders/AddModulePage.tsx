import { FolderStore } from "entities/folder"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CircularLoader } from "shared/ui/loaders/CircularLoader"
import { FolderItem } from "entities/folder"
import { ModuleItem, ModuleStore } from "entities/module"
import { useInitAddModule } from "./model/useInitAddModule"
import { TFolder } from "shared/api/lbc-server/endpoints/types/folder"

export const AddModulePage = (  ) => {

    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : undefined
    const { folderStore, foldersByModule } = useInitAddModule(moduleId)

    if (!moduleId) return
    if (!folderStore || !foldersByModule) return
    if (folderStore.client.isLoading) return <CircularLoader/>

    return <ObserverAddModulePage folderStore={folderStore} foldersByModule={foldersByModule} moduleId={moduleId}/>
}

interface IProps {
    folderStore: FolderStore,
    foldersByModule: TFolder[],
    moduleId: number,
}

const ObserverAddModulePage = observer(({folderStore, foldersByModule, moduleId}: IProps) => {

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const folderIds = foldersByModule.map(folder => folder.id)
        setSelectedIds(folderIds)
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
        folderStore.addModule(selectedIds, moduleId)
            .then(result => {
                if (result?.isError === false) {
                    navigate(-1)
                }
            })
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="p-2 relative w-full">
                <div className=" text-gray-500 font-semibold mb-2">Выберите папки:</div>
                <div className=" gap-2 grid grid-cols-2 mb-2 pb-20">
                    { folderStore.getOnlyOwnFolders().map(folder => (
                        <div key={folder.id} onClick={() => handleClick(folder.id)}
                            className={`border-2  ${selectedIds.find(id => id === folder.id) ? 'border-blue-400' : 'border-transparent'}` }>
                                 <FolderItem folder={folder} isHidePublicIcon={true} isHideBookmarkIcon={true}/>
                        </div>
                    )) }
                </div>
                <div className="p-3 w-full left-1/2 translate-x-[-50%] fixed bottom-14 bg-white border-[1px] rounded-lg">
                    <div className="text-gray-500 font-semibold mb-2">
                        Выбрано папок: {selectedIds.length}
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