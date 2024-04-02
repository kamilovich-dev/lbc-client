import { useState, useEffect } from "react"
import { FolderStore } from "entities/folder"

export const useInitFolder = (folderId: number | undefined) => {

    useEffect(() => {
        fetchData()
    }, [folderId])

    const [folderStore, setFolderStore] = useState<FolderStore | undefined>(undefined)

    const fetchData = async () => {
        if (!folderId) return
        const folderStore = new FolderStore()
        await Promise.all([folderStore.refreshFoldersByFolderId(folderId), folderStore.refreshModulesByFolderId(folderId)])
        setFolderStore(folderStore)
    }

    return folderStore
}