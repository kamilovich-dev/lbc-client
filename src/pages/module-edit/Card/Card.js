import useStyles from './jssCard';

export default function Card( {card, isDragging, handleChangeCard, handleRemoveCard} ) {
    const jss = useStyles();

    return(
        <div
            className={jss.row}
            style={{
                opacity: isDragging? 0.5 : 1
            }
            }
            >
            <div>
                <label>
                ТЕРМИН
                <input
                    name={`termin${card.id}`}
                    type='text'
                    placeholder='Введите термин'
                    value={card.term}
                    onChange={(e) => handleChangeCard(card, e)}
                    />
                </label>
            </div>
            <div>
                <label>
                ОПРЕДЕЛЕНИЕ
                <input
                    name={`definition${card.id}`}
                    type='text'
                    placeholder='Введите определение'
                    value={card.definition}
                    onChange={(e) => handleChangeCard(card, e)}
                />
            </label>
            </div>
            <button onClick={e => handleRemoveCard(card, e)}>Удалить карточку</button>
        </div>
    )
}