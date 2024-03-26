import { useEffect, useState  } from 'react'
import { observer} from 'mobx-react-lite'
import { Alert } from '@mui/material';
import { ShowModules } from 'pages/modules/ui/ShowModules';
import { ModuleStore } from 'entities/module';
import { useAbortController } from 'entities/module';
import { ModulesMenu } from './ui/ModulesMenu';
import { CircularLoader } from "shared/ui/loaders/CircularLoader";

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
                <div className='p-2 md:w-3/5 m-auto pt-20 md-max:w-full'>
                    <div className='bg-blue-50 rounded-md min-h-screen'>
                        <ModulesMenu moduleStore={moduleStore}/>
                        {moduleStore.client.isLoading && !isLoaded ?
                            <><CircularLoader/></> :
                            <div className='pb-20'>
                                {moduleStore.modules.length ?
                                    <ShowModules
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

const ModulesPage = () => {
    const moduleStore = new ModuleStore();
    useAbortController( [moduleStore] )
    return <ObservedModulesPage moduleStore={moduleStore} />
}

export { ModulesPage };