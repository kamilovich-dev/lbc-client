import { useEffect  } from 'react'
import { observer} from 'mobx-react-lite'
import { Alert, Button, Select, MenuItem, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ShowModules } from 'features/show-modules/ShowModules';
import { ModuleStore } from 'entities/module';

import { SessionStoreContext } from 'entities/session';
import { useContext } from 'react';

interface Props {
    moduleStore: ModuleStore
}

const ObservedModulesPage = observer(( { moduleStore }: Props ) => {

    useEffect( () => {
        moduleStore.refreshModules()
    }, [] )

    return (
            <>


                    <div className='p-2 w-3/5 m-auto'>
                    {moduleStore.client.isLoading ?
                         <><div className='flex justify-center pt-10'>
                            <CircularProgress  sx={{color: '#4A6CBD'}} size="100px"/>
                        </div></>
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
            </>
    );
});

const ModulesPage = () => {
    const sessionStore = useContext(SessionStoreContext)
    if (!sessionStore) return

    const moduleStore = new ModuleStore(sessionStore.client);
    return <ObservedModulesPage moduleStore={moduleStore} />
}

export { ModulesPage };