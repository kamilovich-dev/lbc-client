import { makeObservable, observable, action, autorun } from 'mobx';
import type { IModuleStore, TModule } from './types';
import { CardStore } from './CardStore';
import { ModuleViewStore } from "./ModuleViewStore";

class ModuleStore implements IModuleStore {
    modules: TModule[] = [];
    view = new ModuleViewStore();

    constructor() {
        makeObservable(this,{
                modules: observable,
                addModule: action,
                deleteModuleById: action,
                editModule: action
            }
        )
        autorun(() => {
            this.view.updateModules([...this.modules])
        } );
    }

    getModuleById = (id: number) => {
        return this.modules.find(
            module => module.id == id
        )
    }

    addModule = () => {
        const id = this.modules.length === 0 ? 0 : this.modules.length;
        const cardStore = new CardStore();
        this.modules.push({
            id: id,
            name: `Новый модуль ${id}`,
            description: '',
            cardStore: cardStore,
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

}

export { ModuleStore }