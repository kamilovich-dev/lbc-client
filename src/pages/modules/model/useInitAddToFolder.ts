import { useState, useEffect } from "react"
import { ModuleStore } from "entities/module"
import { FolderStore } from "entities/folder"

interface InitData {
    folderStore: FolderStore,
    moduleStore: ModuleStore,
}

export const useInitAddToFolder = (folderId: number | undefined) => {

    useEffect(() => {
        fetchData()
    }, [])

    const [moduleInitData, setModuleInitData] = useState<InitData | undefined>(undefined)

    const fetchData = async () => {
        if (!folderId) return
        const folderStore = new FolderStore()
        const moduleStore = new ModuleStore()
        await Promise.all([folderStore.refreshModulesByFolderId(folderId), moduleStore.refreshModules()])
        setModuleInitData({
            folderStore,
            moduleStore,
        })
    }

    return {...moduleInitData}
}