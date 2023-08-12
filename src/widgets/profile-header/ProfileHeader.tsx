import { useState, useEffect } from 'react';
import { useNavigate, Outlet} from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './styles.module.css';


const ProfileHeader = () => {
    const [tabIndex, setTabIndex] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        setTabIndex(0);
    }, [])

    const handleClick = (url: string) => {
        setTabIndex(url === '/modules' ? 0
            : 1)
        navigate(url);
    };

    return (
        <>
            <div className={styles.container}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                    <Tabs value={tabIndex === -1 ? false : tabIndex} >
                            <Tab label="Модули" onClick={e => handleClick('/modules')}/>
                    </Tabs>
                </Box>
            </div>
            <Outlet />
        </>

    );
};

export { ProfileHeader };