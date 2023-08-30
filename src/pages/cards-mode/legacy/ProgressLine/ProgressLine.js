import React from 'react';
import useStyles from './jssProgressLine';

export default function ProgressLine( { currentCount, cardsCount } ) {
    const jss = useStyles( { currentCount, cardsCount } );

    return (
        <div className={jss.wrapper}>
            <div className={jss.progressLine}></div>
        </div>
    )
}