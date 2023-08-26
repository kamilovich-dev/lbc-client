import { makeObservable, observable, action } from 'mobx';
import { Client, IClient, moduleEndpoints } from 'shared/api/lbc-server'

class ModuleStore implements IModuleStore {
    modules: TModule[] = [];
    moduleById: TModule | undefined;
    filters: TModulesFilter = {
        by_alphabet: 'asc',
        by_search: ''
    }
    delayTimer: NodeJS.Timer | undefined
    client: IClient;

    constructor() {
        makeObservable(this,{
                modules: observable,
                moduleById: observable,
                filters: observable,
                delayTimer: observable,
                client: observable,
                addModule: action,
                deleteModuleById: action,
                deferedEditModule: action,
                editModule: action,
                refreshModules: action,
                refreshModuleById: action,
                deferedRefreshModules: action,
                setFilter: action,
            }
        )
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

    deleteModuleById = async (id: number) => {
        await moduleEndpoints.deleteModule( this.client, { moduleId: id } )
            .then( () => this.refreshModules() )
    }

    deferedEditModule = ( { name, value } : TEditModule ) => {
        if (!this.moduleById) return

        if (name == 'name') this.moduleById.name = value
        if (name == 'description') this.moduleById.description = value

        clearTimeout(this.delayTimer)
        this.delayTimer = setTimeout(() => {
            this.editModule()
        }, 1000)
    }

    editModule = async () => {
        if (!this.moduleById) return

        await moduleEndpoints.editModule(this.client, {
            moduleId: this.moduleById.id,
            name: this.moduleById.name,
            description: this.moduleById.description
        })
    }

    refreshModules = async () => {
        const modules = (await moduleEndpoints.getModules(this.client, this.filters))?.modules
        if (!modules) return;
        this.modules = modules
    }

    refreshModuleById = async (id: number) => {
        const modules = (await moduleEndpoints.getModules(this.client, this.filters))?.modules
        if (!modules) return;
        this.moduleById = modules.find(
            module => module.id == id
        )
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

export interface IModuleStore {
    modules: TModule[],
    moduleById: TModule | undefined;
    filters: TModulesFilter,
    delayTimer: NodeJS.Timer | undefined,
    client: IClient;
    addModule: () => void,
    deleteModuleById: (id: number) => Promise<void>,
    deferedEditModule: ( args: TEditModule) => void,
    refreshModules: () => Promise<void>,
    refreshModuleById: (id: number) => Promise<void>,
    deferedRefreshModules: () => void,
    setFilter: (type: string, value: string) => void,
}

type TModule = {
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
    name: string,
    value: string,
}

export { ModuleStore }