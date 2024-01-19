import type {TError} from './error'

/*Получение модулей*/
export type TMduleSearchParams = {
    by_search: string,
    by_alphabet: string // 'asc' | 'desc'
  }
export type TGetModulesResponse = {
    modules: TModule[]
}
export type TModule = {
    id: number,
    name: string,
    description: string,
    cardsCount: number
}
export type TGetModuleReturn = (TGetModulesResponse & TError) | undefined

/*Создание модуля*/
export type TCreateModulePayload = {
    name: string,
    description: string
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
    name: string,
    description: string
  }
export type TEditModuleResponse = {
    module: {
      id: number,
      name: string,
      description: string,
    }
}
export type TEditModuleReturn = (TEditModuleResponse & TError) | undefined

