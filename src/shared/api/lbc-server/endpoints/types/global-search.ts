import type {TError} from './error'
import { TModule } from './modules'
import { TFolder } from './folder'

/*Глобальный поиск*/
export type TGlobalSearchParams = {
    by_search?: string,
    by_alphabet?: 'desc' | 'asc' | '',
    by_updated_date?: 'desc' | 'asc' | '',
    by_type: 'modules' | 'folders' | 'all'
}

export type TGlobalSearchResponse = {
    modules: TModule[],
    folders: TFolder[]
}

export type TGlobalSearchReturn = (TGlobalSearchResponse & TError) | undefined