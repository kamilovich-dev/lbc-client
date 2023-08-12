import React from 'react';
import useStyles from './jssHelp';
import SvgIcon from '@mui/material/SvgIcon';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

export default function Help( {showHelp, handleClickShowHelp, helpText} ) {
    const jss = useStyles({showHelp});
    const words = helpText.match(/(\w+)/);

    return(
        <>
            <div className={jss.wrapper} onClick={e => handleClickShowHelp(e)}>
                <SvgIcon
                    fontSize='medium'
                    htmlColor='#586380'>
                    <EmojiObjectsOutlinedIcon/>
                </SvgIcon>
                <span className={jss.text}>{ showHelp ? helpText[0] + '_'.repeat(words[0].length - 1) : 'Показать подсказку'}</span>
            </div>
        </>
    )
}