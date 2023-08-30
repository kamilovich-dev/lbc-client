import React from 'react';
import useStyles from './jssParameters';
import {Button} from '@mui/material';

export default function Parameters( {setShowParametersModal}) {
    const jss = useStyles();

    return (
        <Button className={jss.parameters} onClick={() => setShowParametersModal(true)}>
            Параметры
        </Button>
    )
}