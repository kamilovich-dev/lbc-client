import { useContext } from 'react'
import { ModuleStoreContext } from "../contexts/ModuleStoreContext";

const useModuleStore = () => {
    return useContext(ModuleStoreContext)
}

export {useModuleStore}