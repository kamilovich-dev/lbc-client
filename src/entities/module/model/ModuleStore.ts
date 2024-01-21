import { makeAutoObservable } from 'mobx';
import { Client, moduleEndpoints } from 'shared/api/lbc-server'

class ModuleStore {
    modules: TModule[] = [];
    filters: TModulesFilter = {
        by_alphabet: 'asc',
        by_search: ''
    }
    DELAY_TIME: number = 1000
    delayTimer: NodeJS.Timer | undefined
    client: Client;

    constructor() {
        makeAutoObservable(this)
        this.client = new Client()
    }

    addModule = () => {
        moduleEndpoints.createModule(this.client, {
                name: 'Новый модуль',
                'description': '' })
            .then( () => {
                this.refreshModules()
            })
    }

    getModuleById = (id: number) => {
        return this.modules.find(module => module.id == id)
    }

    deleteModuleById = async (id: number) => {
        moduleEndpoints.deleteModule( this.client, { moduleId: id } )
            .then( () => this.refreshModules() )
    }

    editModule = ( { id, name, value } : TEditModule ) => {

        const module = this.modules.find(module => module.id == id)
        if (!module) return

        if (name == 'name') module.name = value || ''
        if (name == 'description') module.description = value || ''

        clearTimeout(this.delayTimer)
        this.delayTimer = setTimeout(async () => {

            moduleEndpoints.editModule(this.client, {
                moduleId: module.id,
                name: module.name,
                description: module.description
            })
            .then( () => this.refreshModules())

        }, this.DELAY_TIME)

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
            default:
                console.log(`cant set filter: type=${type}, value=${value}`);
        }
    }

}

export type TModule = {
    id: number,
    name: string,
    description: string,
    cardsCount: number
}

type TModulesFilter = {
    by_search: string,
    by_alphabet: string,
}

type TEditModule = {
    id: number,
    name: string,
    value: string,
}

export { ModuleStore }