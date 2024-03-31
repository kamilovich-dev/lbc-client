import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { routePaths } from 'shared/config';
import { useNavigate, matchPath, useLocation } from 'react-router-dom';

export const LibraryHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname
    const value = matchPath(routePaths.MODULES, pathname) ? 0 :
        matchPath(routePaths.FOLDERS, pathname) ? 1 : 0

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      if (newValue === 0) navigate(routePaths.MODULES)
      if (newValue === 1) navigate(routePaths.FOLDERS)
    };

    return (
        <>
            <div className='border-b-[1px] border-gray-200'>
                 <Tabs className='' value={value} onChange={handleChange} sx={{height: 40, minHeight: 0}} >
                    <Tab label={
                        <span className='text-xs'>Модули</span>
                    } sx={{p: 0, height: 40, minHeight: 0}}/>
                     <Tab label={
                        <span className='text-xs'>Папки</span>
                    }
                    sx={{p: 0, height: 40, minHeight: 0}}/>
                </Tabs>
            </div>
        </>
    )
}