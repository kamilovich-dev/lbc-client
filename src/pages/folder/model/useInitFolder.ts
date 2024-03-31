import { useState, useEffect } from "react"
import { FolderStore } from "entities/folder"

interface FolderInitData {
    folderStore: FolderStore,
}

export const useInitFolder = (folderId: number) => {

    useEffect(() => {
        fetchData()
    }, [])

    const [moduleInitData, setModuleInitData] = useState<FolderInitData | undefined>(undefined)

    const fetchData = async () => {
        const folderStore = new FolderStore()
        await Promise.all([folderStore.refreshFolders(), folderStore.refreshModulesByFolderId(folderId)])
        setModuleInitData({
            folderStore,
        })
    }

    return {...moduleInitData}
}