import React from 'react';
import useStyles from './jssStar';
import { editModule } from 'data/module-row';

export default function Star( {card, module, setModule, handleStarClick} ) {
    const jss = useStyles( { card });

    function handleClick(e) {
        const _module = {...module};
        const _cards = _module.cards;

        const cardIndex = _cards.findIndex( item => item.id == card.id);
        _cards[cardIndex].starFilled = !_cards[cardIndex].starFilled;

        setModule(editModule(_module));
        handleStarClick();
        e.stopPropagation();
    }

    return (
        <div className={jss.wrapper} onClick={e => handleClick(e)}>
            <div className={jss.star}></div>
        </div>
    )
}