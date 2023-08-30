import React from 'react';
import useStyles from './jssCardsCounter';

export default function CardsCounter( {cardIndex, cardsCount, moduleName} ) {
    const jss = useStyles();

    return (
        <div className={jss.wrapper}>
            <div className={jss.counter}>
                {cardIndex + 1} / {cardsCount}
            </div>
            <div className={jss.name}>
                {moduleName}
            </div>
        </div>
    )
}