import React from 'react';
import useStyles from './jssMixCards';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SvgIcon from '@mui/material/SvgIcon';

export default function MixCards( {isMixed, handleMixedClick} ) {
    const jss = useStyles( {isMixed} );

    return(
        <>
            <div className={jss.wrapper} onClick={handleMixedClick}>
                <SvgIcon
                    htmlColor='#586380'
                    fontSize='large'>
                    <ShuffleIcon />
                </SvgIcon>
            </div>
        </>
    )
}