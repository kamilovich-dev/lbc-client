
import { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { observer } from 'mobx-react-lite';
import { CardRow } from 'entities/module';
import { ModuleStore, CardStore } from 'entities/module';
import { IModuleStore, ICardStore } from 'entities/module';

interface IOuterProps {
    moduleId: number
}

interface IInnerProps {
    moduleStore: IModuleStore,
    cardStore: ICardStore,
    moduleId: number,
}

const ModuleEditForm = ( { moduleId }: IOuterProps) => {
    const moduleStore = new ModuleStore();
    const cardStore = new CardStore();

    return <_ModuleEditForm
                moduleId={moduleId}
                moduleStore={moduleStore}
                cardStore={cardStore}
                />
}

const _ModuleEditForm = observer(( { moduleId, moduleStore, cardStore }: IInnerProps ) => {

    useEffect( () => {
        cardStore.refreshCards(moduleId)
        moduleStore.refreshModuleById(moduleId)
    }, [])

    const module = moduleStore.moduleById
    if (!module) return

    const cards = cardStore.cards;
    if (!cards) return

    return (
        <>
            <div className={'py-2 w-1/2'}>
                <TextField
                    fullWidth
                    name='name'
                    label="Название"
                    variant="standard"
                    value={module.name}
                    onChange={(e) => moduleStore.deferedEditModule({name: e.target.name, value: e.target.value})}/>
            </div>
            <div className={'py-2 mb-5 w-1/2'}>
                    <TextField
                        fullWidth
                        name='description'
                        label="Описание"
                        variant="standard"
                        value={module.description}
                        onChange={(e) => moduleStore.deferedEditModule({name: e.target.name, value: e.target.value})} />
            </div>
            <div className='mb-5'>
                <Button
                    variant="contained"
                    onClick={() => cardStore.addCard(module.id)}>+Добавить карточку</Button>
            </div>
            <div className='flex flex-col gap-7 pb-10'>
                {
                    cards.map( (card, idx) => (
                        <CardRow
                            key={card.id}
                            cardIdx={idx}
                            Term={<TextField
                                fullWidth
                                name='term'
                                label="ТЕРМИН"
                                variant="standard"
                                value={card.term}
                                onChange={(e) => {}}/>}
                            Definition={<TextField
                                fullWidth
                                name='definition'
                                label="ОПРЕДЕЛЕНИЕ"
                                variant="standard"
                                value={card.definition}
                                onChange={(e) => {}}/>}
                            DeleteCard={<Button
                                color='error'
                                variant="contained"
                                onClick={() => cardStore.deleteCardById(module.id, card.id)}>Удалить</Button>}
                            Image={<Input type='file'></Input>}
                        />
                    ))
                }
            </div>
        </>
    );

});

export { ModuleEditForm }