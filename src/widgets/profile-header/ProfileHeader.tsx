import { useState, useEffect } from 'react';
import { useNavigate, Outlet} from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const ProfileHeader = () => {
    const [tabIndex, setTabIndex] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        handleClick('/modules');
    }, [])

    const handleClick = (url: string) => {
        setTabIndex(url === '/modules' ? 0
            : 1)
        navigate(url);
    };

    return (
        <>
            <div>
                <div className='p-2 w-3/5 m-auto'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs sx={{height: '40px', minHeight: '10px'}} value={tabIndex === -1 ? false : tabIndex} >
                                <Tab sx={{height: '40px', minHeight: '10px'}} label="Модули" onClick={e => handleClick('/modules')}/>
                        </Tabs>
                    </Box>
                </div>
                <Outlet />
            </div>
        </>

    );
};

export { ProfileHeader };