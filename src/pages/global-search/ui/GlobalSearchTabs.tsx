import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import type { TGlobalSearchParams } from 'shared/api/lbc-server/endpoints/types/global-search';
import { GlobalSearchStore } from 'entities/global-search';


interface IProps {
    globalSearchStore: GlobalSearchStore
}

const convertTypeToValue = {
    all: 0,
    modules: 1,
    folders: 2
}

export const GlobalSearchTabs = ( {globalSearchStore}: IProps ) => {

    const [tabValue, setTabValue] = useState(convertTypeToValue[globalSearchStore.filters.by_type])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {

        //@ts-ignore
        const type = Object.keys(convertTypeToValue).find( key => convertTypeToValue[key] === newValue)
        //@ts-ignore
        globalSearchStore.setByTypeFilter(type)
        setTabValue(newValue)
    };

    return (
        <>
            <div className='border-b-[1px] border-gray-200'>
                <Tabs className='' value={tabValue} onChange={handleChange} sx={{height: 40, minHeight: 0}} >
                    <Tab label={ <span className='text-xs'>Все</span> } sx={{p: 0, height: 40, minHeight: 0}}/>
                    <Tab label={ <span className='text-xs'>Модули</span>} sx={{p: 0, height: 40, minHeight: 0}}/>
                    <Tab label={ <span className='text-xs'>Папки</span>}sx={{p: 0, height: 40, minHeight: 0}}/>
                </Tabs>
            </div>
        </>
    )
}