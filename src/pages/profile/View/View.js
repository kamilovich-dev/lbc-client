import React, { useState } from 'react';
import useStyles from './jssView.js';
import {
    Link, useParams
} from 'react-router-dom';
import { getModules } from 'data/module-row';

import Card from 'routes/moduleId/components/Card/Card';
import Filter from 'routes/moduleId/components/Filter/Filter';

export default function View() {
    const jss = useStyles();
    const params = useParams();
    const module = getModules().find( item => params.moduleId == item.id );
    const moduleCards = [...module.cards];
    const [filterCategory, setFilterCategory] = useState('original');

    if (filterCategory == 'byAlphabet') {
        moduleCards.sort( (a, b) => {
            return a.term > b.term ? 1 : -1;
        } );
    }

    return (
        <>
            <div className={jss.wrapper}>
                <div className={jss.headWrapper}>
                    Модуль: {module.name }
                </div>
                <div className={jss.modesWrapper}>
                    <Link to='cards' className={jss.modesWrapper__item}>Карточки</Link>
                    <Link to='cards' className={jss.modesWrapper__item}>Заучивание</Link>
                    <Link to='cards' className={jss.modesWrapper__item}>Тест</Link>
                    <Link to='cards' className={jss.modesWrapper__item}>Подбор</Link>
                </div>
                <div className={jss.editWrapper}>
                    <Link to='edit' className={jss.link}>Редактировать</Link>
                </div>
                <div className={jss.cardsWrapper}>
                    <div className={jss.cardsHead}>
                        <span className={jss.cardsHead__name}>
                            Карточки:
                        </span>
                        <div className={jss.cardsHead__filter}>
                            <Filter filterCategory={filterCategory} setFilterCategory={setFilterCategory}/>
                        </div>
                    </div>
                    {moduleCards.map( card => (
                        <Card card={card} key={card.id}/>
                    ) )}
                </div>
            </div>
        </>
    )
}