import React, {useState} from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import useStyles from './jssModesNavigation';

export default function ModesNavigation( ) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const jss = useStyles();
    return (
        <>
        <Button
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
                Карточки
            </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}>
                <MenuItem onClick={handleClose}>Заучивание</MenuItem>
                <MenuItem onClick={handleClose}>Тест</MenuItem>
                <MenuItem onClick={handleClose}>Подбор</MenuItem>
                <MenuItem onClick={handleClose}>Главная</MenuItem>
        </Menu>
        </>

    )
}