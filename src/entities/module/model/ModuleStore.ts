import { autorun, makeAutoObservable, runInAction, when } from 'mobx';
import { Client, moduleEndpoints, bookmarkModuleEndpoints } from 'shared/api/lbc-server'
import { ApiSuccess } from 'shared/api/lbc-server/ui/ApiSuccess';

import type { TModule, TMduleSearchParams } from 'shared/api/lbc-server/endpoints/types/modules'

class ModuleStore {
    modules: TModule[] = [];
    filters: TMduleSearchParams = {
        by_alphabet: '',
        by_updated_date: '',
        by_search: '',
    }
    view: TView = {
        isListed: false, /*Отображение списком*/
        isFiltered: false, /*Активирован фильтр*/
    }
    DEBOUNCE_DELAY: number = 1000
    DEBOUNCE_TIMER_ID: NodeJS.Timer | undefined
    client: Client;

    constructor() {
        makeAutoObservable(this)
        this.client = new Client()
    }

    private debouncedCall = async<T> (callback: () => Promise<T>) => {
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

    setListed = (isListed: boolean) => {
        this.view.isListed = isListed
    }

    addModule = async (name: string, description: string | undefined) => {
        const result = await moduleEndpoints.createModule(this.client, {
            name,
            description
        })
        if (result?.isError === false) this.client.renderMessage(ApiSuccess, 'Добавлено')
        return result
    }

    getModuleById = (id: number) => {
        return this.modules.find(module => module.id == id)
    }

    deleteModuleById = async (moduleId: number) => {
        return moduleEndpoints.deleteModule( this.client, { moduleId } )
            .then( async result => {
                if (result?.isError === false) {
                    this.refreshModules()
                    this.client.renderMessage(ApiSuccess, 'Модуль удален')
                }
                return result
        })
    }

    createBookmarkByModuleId = async (moduleId: number) => {
        bookmarkModuleEndpoints.createModuleBookmark( this.client, { moduleId } )
            .then( (result) => {
                if (result?.isError === false) {
                    this.refreshModules()
                    this.client.renderMessage(ApiSuccess, 'Модуль сохранен')
                }
        })
    }

    deleteBookmarkByModuleId = async (moduleId: number) => {
        return bookmarkModuleEndpoints.deleteBookmark( this.client, { moduleId } )
            .then( async result => {
                if (result?.isError === false) {
                    this.refreshModules()
                    this.client.renderMessage(ApiSuccess, 'Модуль исключен')
                }
                return result
        })
    }

    updateModule = ( { moduleId, name, description } : TUpdateModule ) => {
        const module = this.modules.find(module => module.id === moduleId)
        if (!module) return

        module.name = name
        module.description = description

        if (name === '') return

        this.debouncedCall(() => moduleEndpoints.editModule(this.client, {
            moduleId,
            name,
            description,
        }))
        .then(response => {
            if (response?.isError === false) {
                this.refreshModules()
            }
        })
    }

    updateModuleIsPublished = async ( { moduleId }: TUpdateModuleIsFavorite) => {
        const module = this.modules.find(module => module.id === moduleId)
        if (!module) return

        module.isPublished = module.isPublished ? false : true

        moduleEndpoints.editModule(this.client, {
            moduleId,
            isPublished: module.isPublished
        })
        .then(response => {
            if (response?.isError === false) {
                this.refreshModules()
            }
        })

    }

    refreshModules = async () => {
        return moduleEndpoints.getModules(this.client, this.filters)
            .then( async response => {
                if (response?.isError === false) {
                    runInAction(() => this.modules = response?.modules)
                }
            })
    }

    refreshModulesByModuleId = async (moduleId: number) => {
        return moduleEndpoints.getModule(this.client, { moduleId })
            .then( async response => {
                if (response?.isError === false) {
                    runInAction(() => this.modules = [response?.module])
                }
            })
    }

    resetFilters = () => {
        this.filters.by_search = ''
        this.filters.by_alphabet = ''
        this.filters.by_updated_date = ''
        this.refreshModules()
        this.checkIsFiltered()
    }

    setSearchFilter = (value: TMduleSearchParams['by_search']) => {
        this.filters.by_search = value ?? ''
        this.debouncedCall(this.refreshModules)
        this.checkIsFiltered()
    }

    setAlphabetFilter = (value: TMduleSearchParams['by_alphabet']) => {
        this.filters.by_alphabet = value
        this.filters.by_updated_date = ''
        this.refreshModules()
        this.checkIsFiltered()
    }

    setUpdatedDateFilter = (value: TMduleSearchParams['by_updated_date']) => {
        this.filters.by_alphabet = ''
        this.filters.by_updated_date = value
        this.refreshModules()
        this.checkIsFiltered()
    }
}

type TView = {
    isListed: boolean,
    isFiltered: boolean,
}

type TUpdateModule = {
    moduleId: number,
    name: string,
    description: string,
}

type TUpdateModuleIsFavorite = {
    moduleId: number,
}

export { ModuleStore }