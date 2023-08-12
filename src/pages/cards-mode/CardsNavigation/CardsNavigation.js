import React from 'react';
import useStyles from './jssCardsNavigation';
import SvgIcon from '@mui/material/SvgIcon';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

export default function CardsNavigation( { where, handleCardsNavigationClick, autoplayRef, cardIndex } ) {
    const jss = useStyles();

    return (
        <>
            <button className={jss.wrapper} onClick={e =>handleCardsNavigationClick(where)} ref={autoplayRef} disabled={where == 'prev' && cardIndex == 0 ? true : false}> {/*data-autoplay необходим для автовоспроизведения*/}
                <SvgIcon
                    htmlColor='#586380'
                    fontSize='large'>
                    {where == 'prev' ? <WestIcon/> : <EastIcon/>}
                </SvgIcon>
            </button>
        </>
    )
}