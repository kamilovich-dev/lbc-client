import React, {useState} from 'react';
import useStyles from './jssFastEdit';
import { editCard } from 'data/module-row';

export default function FastEditModal( { card, module, setModule, handleCloseFastEditModalClick }) {
    const jss = useStyles();

    const [termValue, setTermValue] = useState(card.term);
    const [definitionValue, setDefinitionValue] = useState(card.definition);

    function handleInputChange(e) {
        if (e.target.name == 'definition') setDefinitionValue(e.target.value);
        if (e.target.name == 'term') setTermValue(e.target.value);
        if (!e.target.value) {
            e.target.classList.add(jss.invalidInput);
        } else {
            e.target.classList.remove(jss.invalidInput);
        }
    }

    function handleSaveFastEditModalClick(e) {
        if (termValue && definitionValue) {
            const _module = {...module};
            const _cards = [..._module.cards];

            const cardIndex = _cards.findIndex( item => item.id == card.id);
            _cards[cardIndex].term = termValue;
            _cards[cardIndex].definition = definitionValue;

            setModule(editCard(_module, _cards[cardIndex]));
            handleCloseFastEditModalClick(e);
        }
    }

    return (
        <div className={jss.fastEditModal}>
            <div className={jss.fastEditModalHeadText}>Редактировать</div>
            <input
                name="term"
                type="textbox"
                className={jss.fastEditModalTerm}
                value={termValue}
                onChange={e => handleInputChange(e)}></input>
            <input
                name="definition"
                type="textbox"
                className={jss.fastEditModalDefinition}
                value={definitionValue}
                onChange={e => handleInputChange(e)}></input>
            <div className={jss.fastEditModalButtons}>
                <button onClick={e => handleCloseFastEditModalClick(e)} className={jss.fastEditModalClose}>Отмена</button>
                <button onClick={e => handleSaveFastEditModalClick(e)} className={jss.fastEditModalSave}>Сохранить</button>
            </div>
        </div>
    )
}