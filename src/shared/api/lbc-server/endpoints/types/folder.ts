import type {TError} from './error'

/*Получение модулей*/
export type TFolderSearchParams = {
    by_search?: string,
    by_alphabet?: 'desc' | 'asc',
    by_updated_date?: 'desc' | 'asc'
}

export type TGetFolderResponse= {
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
        createdBy: string,
        isOwner: boolean,
        isBookmarked?: boolean,
    }
}
export type TGetFolderReturn = (TGetFolderResponse & TError) | undefined

/*Создание папки*/
export type TCreateFolderPayload = {
    name: string,
}
export type TCreateFolderResponse = {
    folder: TFolder
}
export type TCreateFolderReturn = (TCreateFolderResponse & TError) | undefined

/*Изменение папки*/
export type TUpdateFolderPayload = {
    moduleId: number,
    name: string | undefined,
    description: string | undefined,
    isPublished: boolean | undefined,
}

export type TUpdateFolderResponse = {
    folder: TFolder
}
export type TUpdateFolderReturn = (TUpdateFolderResponse & TError) | undefined


/*Добавление модуля*/
export type TAddModulePayload = {
    moduleId: number,
    folderId: number
}

/*Удаление модуля*/
export type TRemoveModulePayload = {
    moduleId: number,
    folderId: number
}

/*Удаление папки*/
export type TRemoveFolderPayload = {
    folderId: number
}




