import { editModule } from 'data/module-row';

export default function moduleEditReducer(module, action) {
    const _module = { ...module};
        switch(action.type) {
            case 'changedHead': {
                const name = action.name;
                const value = action.value;
                if (name === 'name') _module.name = value;
                if (name === 'description') _module.description = value;
                return editModule(_module);
            }
            case 'changedCard': {
                const card = { ...action.card };
                const name = action.name;
                const value = action.value;
                if (name.indexOf('termin') !== -1) card.term = value;
                if (name.indexOf('definition') !== -1) card.definition = value;
                const cardIndex = _module.cards.findIndex( item => item.id == card.id);
                _module.cards[cardIndex] = card;
                return editModule(_module);
            }
            case 'addedCard': {
                const cardWithMaxId = _module.cards.reduce((prev,cur) => cur?.id > prev.id ? cur : prev, { id: 0 });
                const newCardId = cardWithMaxId.id + 1;
                _module.cards.push({
                    id: newCardId,
                    term: 'termin' + newCardId,
                    definition: 'definition' + newCardId
                })
                return editModule(_module);
            }
            case 'swappedTermins': {
                const _cards = _module.cards.slice();
                _module.cards = _cards.map( item => {
                    const term = item.term;
                    const definition = item.definition;
                    return {
                        ...item,
                        term: definition,
                        definition: term
                    }
                });
                return editModule(_module);
            }
            case 'removedCard': {
                const card = { ...action.card };
                if (_module.cards.length <= 1) return _module;
                const removeCardIndex = _module.cards.findIndex( item => item.id == card.id);
                _module.cards.splice(removeCardIndex, 1);
                return editModule(_module);
            }
            case 'dragEnded': {
                const result = action.result;
                // dropped outside the list
                if (!result.destination) {
                    return _module;
                }
                // reorder using index of source and destination.
                const _cards = _module.cards.slice();
                const [removed] = _cards.splice(result.source.index, 1);
                // put the removed one into destination.
                _cards.splice(result.destination.index, 0, removed);
                _module.cards = [..._cards];
                return editModule(_module);
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
}