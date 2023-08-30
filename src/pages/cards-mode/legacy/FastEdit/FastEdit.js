import React from 'react';
import useStyles from './jssFastEdit';
import SvgIcon from '@mui/material/SvgIcon';
import EditIcon from '@mui/icons-material/Edit';

export default function FastEdit( { handleFastEditClick } ) {
    const jss = useStyles();

    return (
        <>
            <div className={jss.fastEdit} onClick={e => handleFastEditClick(e)}>
                <SvgIcon
                    htmlColor='#586380'>
                    <EditIcon/>
                </SvgIcon>
            </div>
        </>

    )
}