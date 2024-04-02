import type {TError} from './error'

/*Получение модулей*/
export type TMduleSearchParams = {
    by_search?: string,
    by_alphabet?: 'desc' | 'asc' | '',
    by_updated_date?: 'desc' | 'asc' | '',
}

export type TGetModulesResponse = {
    modules: TModule[]
}

export type TModule = {
    id: number,
    name: string,
    description: string,
    isPublished: boolean,
    createdAt: string,
    updatedAt: string,
    options: {
        cardsCount: number,
        createdByLogin: string,
        createdByAvatarUrl: string | undefined,
        isOwner: boolean,
        isBookmarked?: boolean,
    }
}
export type TGetModulesReturn = (TGetModulesResponse & TError) | undefined

/*Получение модуля*/
export type TGetModulePayload = {
    moduleId: number
}
export type TGetModuleResponse = {
    module: TModule
}
export type TGetModuleReturn = (TGetModuleResponse & TError) | undefined

/*Создание модуля*/
export type TCreateModulePayload = {
    name: string,
    description?: string
}
export type TCreateModuleResponse = {
    module: TModule
}
export type TCreateModuleReturn = (TCreateModuleResponse & TError) | undefined

/*Удаление модуля*/
export type TDeleteModulePayload = {
    moduleId: number
}

/*Изменение модуля*/
export type TEditModulePayload = {
    moduleId: number,
    name: string | undefined,
    description: string | undefined,
    isPublished: boolean | undefined,
}

export type TEditModuleResponse = {
    module: Omit<TModule, 'options'>
}
export type TEditModuleReturn = (TEditModuleResponse & TError) | undefined

