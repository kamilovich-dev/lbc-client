import { useState, useEffect } from "react"
import { FolderStore } from "entities/folder"
import { TFolder } from "shared/api/lbc-server/endpoints/types/folder"

interface InitData {
    folderStore: FolderStore,
    foldersByModule: TFolder[],
}

export const useInitAddModule = (moduleId: number | undefined) => {

    useEffect(() => {
        fetchData()
    }, [])

    const [moduleInitData, setModuleInitData] = useState<InitData | undefined>(undefined)

    const fetchData = async () => {
        if (!moduleId) return

        const folderStore = new FolderStore()
        await folderStore.refreshFolders()

        let foldersByModule: TFolder[] = []
        foldersByModule = await folderStore.getFoldersByModuleId(moduleId).then(response => {
            if (response?.isError === false) return response.folders
            return []
        })

        setModuleInitData({
            folderStore,
            foldersByModule,
        })
    }

    return {...moduleInitData}
}