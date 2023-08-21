import { makeObservable, observable, action } from 'mobx';
import type { IModuleStore, TModule, TModulesFilter } from './types';
import { Client, IClient, moduleEndpoints } from 'shared/api'


class ModuleStore implements IModuleStore {
    modules: TModule[] = [];
    client: IClient;
    filters: TModulesFilter = {
        by_alphabet: 'asc',
        by_search: ''
    }
    delayTimer: any

    constructor() {
        makeObservable(this,{
                modules: observable,
                filters: observable,
                delayTimer: observable,
                refreshModules: action,
                setFilter: action,
                addModule: action,
                deleteModuleById: action,
                editModule: action
            }
        )
        this.client = new Client()
    }

    getModuleById = (id: number) => {
        return this.modules.find(
            module => module.id == id
        )
    }

    addModule = () => {
        moduleEndpoints.createModule(this.client, {
                name: 'Новый модуль',
                'description': '' })
            .then( () => {
                this.refreshModules()
            })
    }

    deleteModuleById = async (id: number) => {
        await moduleEndpoints.deleteModule( this.client, { moduleId: id } )
            .then( () => this.refreshModules() )
    }

    editModule = (module: TModule) => {
        const idx = this.modules.findIndex( item => item.id === module.id );
        this.modules[idx] = module;
    }

    refreshModules = async () => {
        const modules = (await moduleEndpoints.getModules(this.client, this.filters))?.modules
        if (!modules) return;
        this.modules = modules
    }

    deferedRefreshModules = () => {
        clearTimeout(this.delayTimer)
        this.delayTimer = setTimeout(() => {
            this.refreshModules()
        }, 1000)
    }

    setFilter = ( type: string, value: string ) => {
        switch(type) {
            case 'byAlphabet':
                this.filters.by_alphabet = value;
                this.refreshModules()
                break;
            case 'bySearch':
                this.filters.by_search = value;
                this.deferedRefreshModules()
                break;
            default:
                console.log(`cant set filter: type=${type}, value=${value}`);
        }
    }

}

export { ModuleStore }