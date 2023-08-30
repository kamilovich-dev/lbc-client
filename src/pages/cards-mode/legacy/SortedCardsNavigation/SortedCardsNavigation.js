import React from 'react';
import useStyles from './jssSortedCardsNavigation';
import SvgIcon from '@mui/material/SvgIcon';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function SortedCardsNavigation( { know, handleClick } ) {
    const jss = useStyles();

    return(
        <>
            <div className={jss.wrapper} onClick={() => handleClick(know)}>
                {know ? (
                    <SvgIcon
                        htmlColor='#35B88A'
                        fontSize='large'>
                        <CheckIcon />
                    </SvgIcon>
                ) : (
                    <SvgIcon
                        htmlColor='#D05700'
                        fontSize='large'>
                        <CloseIcon />
                    </SvgIcon>)}
            </div>
        </>
    )
}