
import { makeAutoObservable, runInAction } from "mobx";
import type { TModule } from "shared/api/lbc-server/endpoints/types/modules";
import type { TFolder } from "shared/api/lbc-server/endpoints/types/folder";
import type { TGlobalSearchParams } from "shared/api/lbc-server/endpoints/types/global-search";
import { Client, globalSearchEndpoints } from "shared/api/lbc-server";

type TSearchResult = {
    modules: TModule[]
    folders: TFolder[]
}

type TView = {
    isListed: boolean,
    isFiltered: boolean,
}

export class GlobalSearchStore {

    client: Client

    view: TView = {
        isListed: false, /*Отображение списком*/
        isFiltered: false, /*Активирован фильтр*/
    }

    filters: TGlobalSearchParams = {
        by_type: 'all',
        by_search: '',
        by_alphabet: '',
        by_updated_date: '',
    }

    searchResult: TSearchResult = {
        modules: [],
        folders: []
    }

    DEBOUNCE_DELAY: number = 1000
    DEBOUNCE_TIMER_ID: NodeJS.Timer | undefined

    private debouncedCall = async<T> (callback: () => Promise<T>) => {
        clearTimeout(this.DEBOUNCE_TIMER_ID)
        return new Promise<T>( resolve => {
            this.DEBOUNCE_TIMER_ID = setTimeout( () => resolve(callback()), this.DEBOUNCE_DELAY)
        })
    }

    private checkIsFiltered = () => {
        //@ts-ignore
        if (Object.keys(this.filters).find(key => this.filters[key] !== '' && key !== 'by_type')) {
            this.view.isFiltered = true
        } else this.view.isFiltered = false
    }

    setListed = (isListed: boolean) => {
        this.view.isListed = isListed
    }

    resetFilters = () => {
        this.filters.by_search = ''
        this.filters.by_alphabet = ''
        this.filters.by_updated_date = ''
        this.filters.by_type = 'all'
        this.search()
        this.checkIsFiltered()
    }

    setSearchFilter = (value: TGlobalSearchParams['by_search']) => {
        this.filters.by_search = value ?? ''
        this.debouncedCall(this.search)
        this.checkIsFiltered()
    }

    setAlphabetFilter = (value: TGlobalSearchParams['by_alphabet']) => {
        this.filters.by_alphabet = value
        this.filters.by_updated_date = ''
        this.search()
        this.checkIsFiltered()
    }

    setUpdatedDateFilter = (value: TGlobalSearchParams['by_updated_date']) => {
        this.filters.by_alphabet = ''
        this.filters.by_updated_date = value
        this.search()
        this.checkIsFiltered()
    }

    setByTypeFilter = (value: TGlobalSearchParams['by_type']) => {
        this.filters.by_type = value
        this.search()
        this.checkIsFiltered()
    }

    constructor() {
        makeAutoObservable(this)
        this.client = new Client()
    }

    search = async () => {
        return globalSearchEndpoints.globalSearch(this.client, this.filters)
            .then(result => {
                if (result?.isError === false) {
                    runInAction(() => {
                        this.searchResult.modules = result.modules
                        this.searchResult.folders = result.folders
                    })
                }
            })
    }

}