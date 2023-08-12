import { createContext } from "react";
import { IModuleStore } from '../model/types';

const ModuleStoreContext = createContext<IModuleStore | null>(null);

export { ModuleStoreContext }