import React from 'react';
import useStyles from './jssAutoplay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SvgIcon from '@mui/material/SvgIcon';

export default function Autoplay( { autoplayStage, handleAutoplayClick } ) {
    const jss = useStyles( {autoplayStage} );

    return(

        <div className={jss.wrapper} onClick={handleAutoplayClick}>
            <SvgIcon
                htmlColor='#586380'
                fontSize='large'>
                {autoplayStage == -1 ? <PlayArrowIcon/> : <StopIcon/>}
            </SvgIcon>
        </div>
    )
}