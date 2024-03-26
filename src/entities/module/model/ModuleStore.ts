import { autorun, makeAutoObservable } from 'mobx';
import { Client, moduleEndpoints, bookmarkModuleEndpoints } from 'shared/api/lbc-server'
import { ApiSuccess } from 'shared/api/lbc-server/ui/ApiSuccess';

import type { TModule, TMduleSearchParams } from 'shared/api/lbc-server/endpoints/types/modules'

class ModuleStore {
    modules: TModule[] = [];
    filters: TMduleSearchParams = {
        by_alphabet: 'asc',
        by_updated_date: undefined,
        by_search: undefined,
    }
    view: TView = {
        isListed: false, /*Отображение списком*/
        isFiltered: false, /*Активирован фильтр*/
    }
    DELAY_TIME: number = 1000
    delayTimer: NodeJS.Timer | undefined
    client: Client;

    constructor() {
        makeAutoObservable(this)
        this.client = new Client()
        autorun(() => {
            if (Object.values(this.filters).find(item => item !== undefined)) {
                this.view.isFiltered = true
            } else this.view.isFiltered = false
        })
    }

    setListed = (isListed: boolean) => {
        this.view.isListed = isListed
    }

    addModule = async (name: string, description: string | undefined) => {
        const result = await moduleEndpoints.createModule(this.client, {
            name,
            description
        })
        if (result?.isError === false) this.client.renderMessage(ApiSuccess, 'Добавлено', 200)
        return result
    }

    getModuleById = (id: number) => {
        return this.modules.find(module => module.id == id)
    }

    deleteModuleById = async (moduleId: number) => {
        moduleEndpoints.deleteModule( this.client, { moduleId } )
            .then( (result) => {
                if (result?.isError === false) {
                    this.refreshModules()
                    this.client.renderMessage(ApiSuccess, 'Модуль удален', 200)
                }
        })
    }

    deleteBookmarkByModuleId = async (moduleId: number) => {
        bookmarkModuleEndpoints.deleteBookmark( this.client, { moduleId } )
            .then( (result) => {
                if (result?.isError === false) {
                    this.refreshModules()
                    this.client.renderMessage(ApiSuccess, 'Модуль исключен', 200)
                }
        })
    }

    editModule = ( { id, name, value } : TEditModule ) => {
        const module = this.modules.find(module => module.id == id)
        if (!module) return

        if (name == 'name') module.name = value
        if (name == 'description') module.description = value
        if (name == 'isPublished') module.isPublished = module.isPublished ? !module.isPublished : true

        clearTimeout(this.delayTimer)
        if (name == 'name' || name == 'description') {
            this.delayTimer = setTimeout(() => {
                this.edit(module).then( (result) => {
                    if (result?.isError === false) this.refreshModules()
                })
            }, this.DELAY_TIME)
        } else this.edit(module)
    }

    private edit= async (module: TModule) => {
        return moduleEndpoints.editModule(this.client, {
            moduleId: module.id,
            name: module.name,
            isPublished: module.isPublished,
            description: module.description
        })
    }

    refreshModules = async () => {
        return moduleEndpoints.getModules(this.client, this.filters)
            .then( response => this.modules = response?.modules ?? [] )
    }

    setFilter = ( type: string, value: string ) => {
        switch(type) {
            case 'byAlphabet':
                if (value === 'asc' || value === 'desc') {
                    this.filters.by_alphabet = value;
                    this.refreshModules()
                }
                break;
            case 'bySearch':
                this.filters.by_search = value;
                clearTimeout(this.delayTimer)
                this.delayTimer = setTimeout(this.refreshModules, this.DELAY_TIME)
                break;
            case 'byUpdatedDate':
                if (value === 'asc' || value === 'desc') {
                    this.filters.by_updated_date = value
                    this.refreshModules()
                }
                break
            default:
                console.log(`cant set filter: type=${type}, value=${value}`);
        }
    }

}

type TView = {
    isListed: boolean,
    isFiltered: boolean,
}

type TEditModule = {
    id: number,
    name: string,
    value: string,
}

export { ModuleStore }