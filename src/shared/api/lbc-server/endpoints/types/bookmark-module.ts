import type {TError} from './error'

/*Создание закладки на модуль*/
export type TCreateModuleBookmarkPayload = {
    moduleId: number,
}
export type TCreateModuleBookmarkResponse = {
    id: number
}
export type TCreateModuleBookmarkReturn = (TCreateModuleBookmarkPayload & TError) | undefined


/*Удаление закладки на модуль*/
export type TDeleteModuleBookmarkPayload = {
    moduleId: number
}

export type TDeleteModuleBookmarkResponse = {
    message: string,
}

export type TDeleteModuleBookmarkReturn = (TDeleteModuleBookmarkResponse & TError) | undefined