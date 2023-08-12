import React from 'react';
import useStyles from './jssRestart';
import ReplayIcon from '@mui/icons-material/Replay';
import SvgIcon from '@mui/material/SvgIcon';

export default function Restart( {handleRestartClick}) {
    const jss = useStyles();

    return(
        <>
            <div className={jss.wrapper} onClick={handleRestartClick}>
                <SvgIcon
                    htmlColor='#586380'
                    fontSize='large'>
                    <ReplayIcon />
                </SvgIcon>
            </div>
        </>
    )
}