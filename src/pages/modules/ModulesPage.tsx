import { useEffect, useState  } from 'react'
import { observer} from 'mobx-react-lite'
import { Alert } from '@mui/material';
import { ListModules } from 'pages/modules/ui/ListModules';
import { ModuleStore } from 'entities/module';
import { useAbortController } from 'entities/session';
import { ModuleListHeader } from './ui/ModuleListHeader';
import { CircularLoader } from "shared/ui/loaders/CircularLoader";

import { LibraryHeader } from 'features/navigation/library/LibraryHeader';

interface Props {
    moduleStore: ModuleStore
}

const ObservedModulesPage = observer(( { moduleStore }: Props ) => {

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect( () => {
        moduleStore.refreshModules()
            .then(() => setIsLoaded(true))
    }, [] )

    return (
            <>
                <div className='p-2 md:w-3/5 m-auto pt-16 md-max:w-full'>
                    <div className='bg-blue-50 rounded-md min-h-screen'>
                        <div className='mb-2'>
                            <LibraryHeader/>
                        </div>
                        <ModuleListHeader moduleStore={moduleStore}/>
                        {moduleStore.client.isLoading && !isLoaded ?
                            <><CircularLoader/></> :
                            <div className='pb-20'>
                                {moduleStore.modules.length ?
                                    <ListModules
                                        moduleStore={moduleStore}/>
                                    : <Alert severity="info" sx={{ width: '100%' }}>
                                        Модули не найдены!
                                    </Alert>
                                }
                            </div>}
                    </div>
                </div>
            </>
    );
});

export const ModulesPage = () => {
    const moduleStore = new ModuleStore();
    useAbortController( [moduleStore] )
    return <ObservedModulesPage moduleStore={moduleStore} />
}