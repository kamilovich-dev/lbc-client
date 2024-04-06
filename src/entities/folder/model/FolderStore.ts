import type { TFolder, TFolderSearchParams } from "shared/api/lbc-server/endpoints/types/folder";
import type  { TModule } from "shared/api/lbc-server/endpoints/types/modules";

import { bookmarkFolderEndpoints, Client, folderEndpoints } from "shared/api/lbc-server";
import { makeAutoObservable, runInAction } from "mobx";
import { ApiSuccess } from "shared/api/lbc-server/ui/ApiSuccess";

type TView = {
    isListed: boolean,
    isFiltered: boolean,
}

type TEditFolder = {
    folder: TFolder,
    field: 'name' | 'description' | 'isPublished',
    value: string,
}

export class FolderStore {

    folders: TFolder[] = [];
    modules: TModule[] = []
    client: Client;

    filters: TFolderSearchParams = {
        by_alphabet: '',
        by_search: '',
        by_updated_date: ''
    }

    view: TView = {
        isListed: false,
        isFiltered: false,
    }

    DEBOUNCE_DELAY = 500
    DEBOUNCE_TIMER_ID: NodeJS.Timer | undefined = undefined

    constructor() {
        makeAutoObservable(this)
        this.client = new Client()
    }

    private debouncedCall = async<T>(callback: T extends Function ? T : any) => {
        clearTimeout(this.DEBOUNCE_TIMER_ID)
        return new Promise<T>( resolve => {
            this.DEBOUNCE_TIMER_ID = setTimeout( () => resolve(callback()), this.DEBOUNCE_DELAY)
        })
    }

    private checkIsFiltered = () => {
        if (Object.values(this.filters).find(item => item !== '')) {
            this.view.isFiltered = true
        } else this.view.isFiltered = false
    }

    setListedView = (isListed: boolean) => {
        this.view.isListed = isListed
    }

    createFolder = async (name: string, description: string) => {
        return folderEndpoints.createFolder(this.client, {
            name,
            description
        }).then(result => {
            if (result?.isError === false)  this.client.renderMessage(ApiSuccess, 'Папка создана')
            return result
        })
    }

    updateFolder = async ( {folder, field, value }: TEditFolder) => {

        if (field === 'name' || field === 'description') {
            return this.debouncedCall(() => folderEndpoints.updateFolder(this.client, {
                folderId: folder.id,
                [field]: value,
            })
            .then(result => {
                if (result?.isError === false) this.refreshFolders()
            }))
        }

        folderEndpoints.updateFolder(this.client, {
            folderId: folder.id,
            [field]: folder.isPublished ? false : true,
        }).then((result) => {
            if (result?.isError === false)  this.refreshFolders()
        })
    }

    addModule = async (folderId: number, moduleIds: number[]) => {
        return folderEndpoints.addModule(this.client, {
            folderId, moduleIds
        }).then(result => {
            if (result?.isError === false) {
                this.client.renderMessage(ApiSuccess, 'Успешно')
                this.refreshModulesByFolderId(folderId)
            }
            return result
        })
    }

    removeFolder = async (folderId: number) => {
        return folderEndpoints.removeFolder(this.client, {
            folderId
        }).then(async result => {
            if (result?.isError === false) {
                this.client.renderMessage(ApiSuccess, 'Папка удалена')
                this.refreshFolders()
            }
            return result
        })
    }

    deleteBookmarkByFolderId = async (folderId: number) => {
        return bookmarkFolderEndpoints.deleteBookmark( this.client, { folderId } )
            .then( async result => {
                if (result?.isError === false) {
                    this.refreshFolders()
                    this.client.renderMessage(ApiSuccess, 'Папка исключена')
                }
                return result
        })
    }

    createBookmarkByFolderId = async (folderId: number) => {
        bookmarkFolderEndpoints.createFolderBookmark( this.client, { folderId } )
            .then( (result) => {
                if (result?.isError === false) {
                    this.refreshFolders()
                    this.client.renderMessage(ApiSuccess, 'Папка сохранена')
                }
        })
    }

    refreshFolders = async () => {
        return folderEndpoints.getFolders(this.client, this.filters)
        .then(result => {
            if (result?.isError === false) {
                runInAction(() => this.folders = result.folders)
            }
        })
    }

    refreshFoldersByFolderId = async (folderId: number) => {
        return folderEndpoints.getFolder(this.client, { folderId })
            .then( async response => {
                if (response?.isError === false) {
                    runInAction(() => this.folders = [response?.folder])
                }
            })
    }

    getFolderById = (folderId: number) => {
        return this.folders.find(folder => folder.id === folderId)
    }

    refreshModulesByFolderId = async (folderId: number) => {
        return folderEndpoints.getFolderModules(this.client, { folderId })
            .then(async result => {
                if (result?.isError === false) {
                    runInAction(() => this.modules = result.modules)
                }
            })
    }

    setSearchFilter = async (value: TFolderSearchParams['by_search']) => {
        this.filters.by_search = value
        this.debouncedCall(this.refreshFolders)
    }

    setAlphabetFilter = async (value: TFolderSearchParams['by_alphabet']) => {
        this.filters.by_alphabet = value
        this.filters.by_updated_date = ''
        this.refreshFolders()
        this.checkIsFiltered()
    }

    setUpdatedDateFilter = async (value: TFolderSearchParams['by_updated_date']) => {
        this.filters.by_alphabet = ''
        this.filters.by_updated_date = value
        this.refreshFolders()
        this.checkIsFiltered()
    }

    resetFilters = async () => {
        this.filters.by_search = ''
        this.filters.by_alphabet = ''
        this.filters.by_updated_date = ''
        this.refreshFolders()
        this.checkIsFiltered()
    }

}