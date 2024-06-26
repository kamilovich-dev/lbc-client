import type {TError} from './error'
import { TModule } from './modules'

/*Получение модулей*/
export type TFolderSearchParams = {
    by_search?: string,
    by_alphabet?: 'desc' | 'asc' | '',
    by_updated_date?: 'desc' | 'asc' | ''
}

export type TGetFoldersResponse= {
    folders: TFolder[]
}

export type TFolder = {
    id: number,
    name: string,
    description: string,
    isPublished: boolean,
    createdAt: string,
    updatedAt: string,
    options: {
        modulesCount: number,
        createdByLogin: string,
        createdByAvatarUrl: string,
        isOwner: boolean,
        isBookmarked?: boolean,
    }
}
export type TGetFoldersReturn = (TGetFoldersResponse & TError) | undefined

/*Получение папки*/
export type TGetFolderPayload = {
    folderId: number
}
export type TGetFolderResponse = {
    folder: TFolder
}
export type TGetFolderReturn = (TGetFolderResponse & TError) | undefined

/*Создание папки*/
export type TCreateFolderPayload = {
    name: string,
    description: string,
}
export type TCreateFolderResponse = {
    folder: TFolder
}
export type TCreateFolderReturn = (TCreateFolderResponse & TError) | undefined

/*Изменение папки*/
export type TUpdateFolderPayload = {
    folderId: number,
    name?: string | undefined,
    description?: string | undefined,
    isPublished?: boolean | undefined,
}

export type TUpdateFolderResponse = {
    folder: TFolder
}
export type TUpdateFolderReturn = (TUpdateFolderResponse & TError) | undefined


/*Добавление модулей*/
export type TAddModulesPayload = {
    folderId: number
    moduleIds: number[],
}

/*Добавление модуля*/
export type TAddModulePayload = {
    folderIds: number[],
    moduleId: number,
}

/*Удаление папки*/
export type TRemoveFolderPayload = {
    folderId: number
}

/*получение модулей папки*/
export type TGetFolderModulesPayload = {
    folderId: number
}

export type TGetFolderModulesResponse = {
    modules: TModule[]
}

/*Получение папок по модулю*/
export type TGetFoldersByModulePayload = {
    moduleId: number
}

export type TGetFoldersByModuleResponse = {
    folders: TFolder[]
}

export type TGetFoldersByModuleReturn = (TGetFoldersByModuleResponse & TError) | undefined


export type TGetFolderModulesReturn = (TGetFolderModulesResponse & TError) | undefined




