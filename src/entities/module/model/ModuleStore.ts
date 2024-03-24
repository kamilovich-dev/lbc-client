import { autorun, makeAutoObservable } from 'mobx';
import { Client, moduleEndpoints } from 'shared/api/lbc-server'
import { ApiSuccess } from 'shared/api/lbc-server/ui/ApiSuccess';

class ModuleStore {
    modules: TModule[] = [];
    filters: TModulesFilter = {
        by_alphabet: 'asc', // 'asc' | 'desc'
        by_search: '', // 'text'
        by_favorite: '', // 'true' || ''
    }
    DELAY_TIME: number = 1000
    delayTimer: NodeJS.Timer | undefined
    client: Client;

    view = {
        isListed: false, /*Отображение списком*/
        isFilter: false, /*Активирован фильтр*/
    }

    constructor() {
        makeAutoObservable(this)
        this.client = new Client()
        autorun(() => {
            if (this.filters.by_alphabet || this.filters.by_search || this.filters.by_favorite ) {
                this.view.isFilter = true
            } else this.view.isFilter = false
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
        this.client.renderMessage(ApiSuccess, 'Добавлено', 200)
        return result
    }

    getModuleById = (id: number) => {
        return this.modules.find(module => module.id == id)
    }

    deleteModuleById = async (id: number) => {
        moduleEndpoints.deleteModule( this.client, { moduleId: id } )
            .then( () => {
                this.refreshModules()
                this.client.renderMessage(ApiSuccess, 'Удалено', 200)
        })
    }

    editModule = ( { id, name, value } : TEditModule ) => {

        const module = this.modules.find(module => module.id == id)
        if (!module) return

        if (name == 'name') module.name = value || ''
        if (name == 'description') module.description = value || ''
        if (name == 'isFavorite') module.isFavorite = module.isFavorite ? !module.isFavorite : true

        clearTimeout(this.delayTimer)
        if (name == 'name' || name == 'description') {
            this.delayTimer = setTimeout(() => {
                this.edit(module)
                    .then( () => this.refreshModules())
            }, this.DELAY_TIME)
        } else this.edit(module)

    }

    private edit= async (module: TModule) => {
        return moduleEndpoints.editModule(this.client, {
            moduleId: module.id,
            name: module.name,
            isFavorite: module.isFavorite,
            description: module.description
        })
    }

    refreshModules = async () => {
        return moduleEndpoints.getModules(this.client, this.filters)
            .then( response => {
                if (response?.modules) this.modules = response.modules
            } )
    }

    setFilter = ( type: string, value: string ) => {
        switch(type) {
            case 'byAlphabet':
                this.filters.by_alphabet = value;
                this.refreshModules()
                break;
            case 'bySearch':
                this.filters.by_search = value;
                clearTimeout(this.delayTimer)
                this.delayTimer = setTimeout(() => {
                    this.refreshModules()
                }, this.DELAY_TIME)
                break;
            case 'byFavorite':
                this.filters.by_favorite = value
                this.refreshModules()
                break
            default:
                console.log(`cant set filter: type=${type}, value=${value}`);
        }
    }

}

export type TModule = {
    id: number,
    name: string,
    description: string,
    isFavorite: boolean,
    cardsCount: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface TModulesFilter  {
    by_search: string,
    by_alphabet: string,
    by_favorite: string
}

type TEditModule = {
    id: number,
    name: string,
    value: string,
}

export { ModuleStore }