import React from 'react';
import useStyles from './jssSortedCancel';
import SvgIcon from '@mui/material/SvgIcon';
import UndoIcon from '@mui/icons-material/Undo';

export default function SortedCancel( {cardIndex, handleSortedCancelClick} ) {
    const jss = useStyles( {cardIndex });

    return(
        <>
            <button className={jss.wrapper} onClick={handleSortedCancelClick} disabled={cardIndex == 0 ? true : false}>
                <SvgIcon
                    htmlColor={cardIndex == 0 ? '#E8EAF1' : '#586380'}
                    fontSize='large'>
                    <UndoIcon />
                </SvgIcon>
            </button>
        </>
    )
}