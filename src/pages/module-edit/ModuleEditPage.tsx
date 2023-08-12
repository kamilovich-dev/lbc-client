import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CardRow } from 'entities/module';
import { DeleteCard } from 'features/delete-card/DeleteCard';
import { CardTerm, CardDefinition } from 'features/edit-card';
import { ModuleDescription, ModuleName } from 'features/edit-module';
import { AddCard } from 'features/add-card/AddCard';
import { useModuleStore } from 'entities/module';

const ModuleEditPage = observer(() => {
    const moduleStore = useModuleStore();
    if (!moduleStore) return;

    const { moduleId } = useParams();
    if (!moduleId) return;

    const module = moduleStore.getModuleById( parseInt(moduleId) );
    if (!module) return;

    const cards = module.cardStore.cards;
    return (
        <>
            <div className={'py-2 w-1/2'}>
                <ModuleName
                    moduleStore={moduleStore}
                    module={module}
                    name={module.name} />
            </div>
            <div className={'py-2 mb-5 w-1/2'}>
                <ModuleDescription
                    moduleStore={moduleStore}
                    module={module}
                    description={module.description} />
            </div>
            <div className='mb-5'>
                <AddCard
                    cardStore={module.cardStore}/>
            </div>
            <div className='flex flex-col gap-7 pb-10'>
                {
                    cards.map( (card, idx) => (
                        <CardRow
                            key={card.id}
                            cardIdx={idx}
                            Term={<CardTerm
                                cardStore={module.cardStore}
                                card={card}
                                term={card.term}
                            />}
                            Definition={<CardDefinition
                                cardStore={module.cardStore}
                                card={card}
                                definition={card.definition}
                            />}
                            DeleteCard={<DeleteCard
                                cardStore={module.cardStore}
                                cardId={card.id}
                            />}
                        />
                    ))
                }
            </div>

        </>
    );
});

export { ModuleEditPage };