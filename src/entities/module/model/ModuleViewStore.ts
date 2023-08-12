import {makeObservable, observable, action, computed} from "mobx";
import { IModuleViewStore, TModule } from './types';

class ModuleViewStore implements IModuleViewStore {
    modules: TModule[] = [];
    filters = {
        byOrder: 'asc',
        byName: ''
    }

    constructor() {
        makeObservable(this, {
            modules: observable,
            filters: observable,
            updateModules: action,
            setFilter: action,
            filteredModules: computed,
        })
    }

    updateModules = ( modules: TModule[] ) => {
        this.modules = modules;
    }

    setFilter = ( type: string, value: string ) => {
        switch(type) {
            case 'byOrder':
                this.filters.byOrder = value;
                break;
            case 'byName':
                this.filters.byName = value;
                break;
            default:
                console.log(`cant set filter: type=${type}, value=${value}`);
        }
    }

    get filteredModules() {
        let modules = [...this.modules];
        if (this.filters.byOrder) {
            modules = modules.sort( (a, b) => {
                return (this.filters.byOrder === 'asc') ?
                    ( a.name > b.name ? 1 : -1 ) :
                    ( a.name > b.name ? -1 : 1 )
            } )
        }

        if (this.filters.byName) {
            modules = modules.filter(
                module => module.name.toLowerCase().includes(this.filters.byName.toLowerCase()) )
        }

        return modules;
    }

}

export { ModuleViewStore }