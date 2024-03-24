import type {TError} from './error'

/*Создание закладки на папку*/
export type TCreateFolderBookmarkPayload = {
    folderId: number,
}
export type TCreateFolderBookmarkResponse = {
    id: number
}
export type TCreateFolderBookmarkReturn = (TCreateFolderBookmarkPayload & TError) | undefined


/*Удаление закладки на папку*/
export type TDeleteFolderBookmarkPayload = {
    folderId: number
}

export type TDeleteFolderBookmarkResponse = {
    message: string,
}

export type TDeleteFolderBookmarkReturn = (TDeleteFolderBookmarkResponse & TError) | undefined