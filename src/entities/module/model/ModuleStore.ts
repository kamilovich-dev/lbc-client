import { makeObservable, observable, action } from 'mobx';
import type { IModuleStore, TModule, TModulesFilter } from './types';
import { Client, moduleEndpoints } from 'shared/api'
import { AxiosInstance } from 'axios';


class ModuleStore implements IModuleStore {
    modules: TModule[] = [];
    axiosInstanse: AxiosInstance;
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
        ),
        this.axiosInstanse = new Client().axiosInstance
    }

    getModuleById = (id: number) => {
        return this.modules.find(
            module => module.id == id
        )
    }

    addModule = () => {
        moduleEndpoints.createModule(this.axiosInstanse, {
                name: 'Новый модуль',
                'description': '' })
            .then( () => {
                this.refreshModules()
            })
    }

    deleteModuleById = (id: number) => {
        this.modules = this.modules.filter(
            module => module.id !== id
        )
    }

    editModule = (module: TModule) => {
        const idx = this.modules.findIndex( item => item.id === module.id );
        this.modules[idx] = module;
    }

    refreshModules = async () => {
        const modules = (await moduleEndpoints.getModules(this.axiosInstanse, this.filters))?.modules
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