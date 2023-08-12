import React from 'react';
import {useNavigate} from 'react-router-dom';
import useStyles from './jssReturnToModule';
import {Button} from '@mui/material';

export default function CardsCounter(  ) {
    const jss = useStyles();
    const navigate = useNavigate();

    function handleClick() {
        return navigate('..\\');
    }

    return (
        <Button className={jss.returnToModule} onClick={handleClick}>
            К модулю
        </Button>
    )
}