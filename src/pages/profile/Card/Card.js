import React from 'react';
import useStyles from './jssCard.js';

export default function Card( { card } ) {
    const jss = useStyles();

    return (
        <div className={jss.card}>
            <div className={jss.term}>
                <span>Термин: {card.term}</span>
            </div>
            <div className={jss.definition}>
                <span>Определение: {card.definition}</span>
            </div>
        </div>
    )
}