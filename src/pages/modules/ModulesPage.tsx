import { useEffect  } from 'react'
import { observer} from 'mobx-react-lite'
import { Alert, Button, Select, MenuItem, TextField } from '@mui/material';
import { ShowModules } from 'features/show-modules/ShowModules';
import { ModuleStore } from 'entities/module';
import { ListSkeleton } from 'shared/ui/skeletons/ListSkeleton';
import { useAbortController } from 'entities/module';

interface Props {
    moduleStore: ModuleStore
}

const ObservedModulesPage = observer(( { moduleStore }: Props ) => {

    useEffect( () => {
        moduleStore.refreshModules()
    }, [] )

    return (
            <>
                <div className='p-2 w-3/5 m-auto pt-4'>
                    <div className='bg-blue-50 rounded-md p-4 min-h-screen'>
                        {moduleStore.client.isLoading ?
                            <>
                                <ListSkeleton/>
                            </>
                            :
                            <>
                            <div className='flex gap-4 mb-4'>
                            <Button
                                    size='small'
                                    variant="contained"
                                    onClick={moduleStore.addModule}>
                                + ДОБАВИТЬ МОДУЛЬ</Button>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={moduleStore.filters.by_alphabet}
                                label="Age"
                                onChange={e => moduleStore.setFilter('byAlphabet', e.target.value)}
                                size='small'
                            >
                                <MenuItem  value={'asc'}>По возрастанию</MenuItem>
                                <MenuItem  value={'desc'}>По убыванию</MenuItem>
                            </Select>
                            <TextField
                                onChange={e => moduleStore.setFilter('bySearch',e.target.value) }
                                label="Поиск модулей"
                                variant="outlined"
                                value={moduleStore.filters.by_search}
                                size='small'
                            />
                        </div>
                        <div>
                            {moduleStore.modules.length ?
                                <ShowModules
                                    moduleStore={moduleStore}
                                    modules={moduleStore.modules} />
                                            : <Alert severity="info" sx={{ width: '100%' }}>
                                                Модули не найдены!
                                            </Alert>
                            }
                        </div>
                            </>}
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