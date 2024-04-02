
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { observer, Observer } from 'mobx-react-lite';
import { EditCardItem } from 'entities/module';
import { ModuleStore, CardStore } from 'entities/module';
import { CardImage } from './CardImage';
import { DragDropContext, Draggable, DragUpdate, Droppable, DropResult } from 'react-beautiful-dnd'
import { CircularLoader } from "shared/ui/loaders/CircularLoader";

interface IOuterProps {
    moduleId: number
}

interface IInnerProps {
    moduleStore: ModuleStore,
    cardStore: CardStore,
    moduleId: number,
}

const ModuleEditForm = ( { moduleId }: IOuterProps) => {
    const moduleStore = new ModuleStore();
    const cardStore = new CardStore(moduleId);

    return (<ObserverModuleEditForm
                moduleId={moduleId}
                moduleStore={moduleStore}
                cardStore={cardStore}
            />)
}

const ObserverModuleEditForm = observer(( { moduleId, moduleStore, cardStore }: IInnerProps ) => {

    useEffect( () => {
        console.log('request')
        cardStore.refreshCards()
        moduleStore.refreshModules()
    }, [moduleId])

    const module = moduleStore.getModuleById(moduleId)
    const cards = cardStore.cards;

    if (!cards || !module) return <CircularLoader/>

    const handleDragEnd = (result: DropResult ) => {
        const { destination, source } = result

        if (!destination) return

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return

        const newCards = cardStore.cards.slice()
        const [removed] = newCards.splice(source.index, 1)
        newCards.splice(destination.index, 0, removed)

        cardStore.cards = newCards.slice()
    }

    const handleDragUpdate = (result: DragUpdate) => {
        const { destination, draggableId } = result

        if (!destination) return;

        cardStore.switchOrder({
            cardId1: parseInt(draggableId),
            cardId2: cardStore.cards[destination?.index].id
        })
    }

    const createdAtString = module?.createdAt ? new Date(module.createdAt).toLocaleString() : ''
    const updatedAtString = module?.updatedAt ? new Date(module.updatedAt).toLocaleString() : ''

    return (
        <>
            <div className={'py-2 w-2/6 mb-2 md-max:w-full'}>
                <TextField
                    fullWidth
                    error={module.name ? false : true}
                    helperText={module.name ? '' : 'Обязательное поле'}
                    multiline
                    name='name'
                    InputLabelProps={{style: {fontSize: 14}}}
                    inputProps={{style: {fontSize: 16}}}
                    label="Название"
                    variant="standard"
                    value={module.name}
                    onChange={(e) => moduleStore.editModule({id: moduleId, name: e.target.name, value: e.target.value})}/>
            </div>
            <div className={'py-2 mb-2 w-2/6 md-max:w-full'}>
                    <TextField
                        fullWidth
                        multiline
                        InputLabelProps={{style: {fontSize: 14}}}
                        inputProps={{style: {fontSize: 16}}}
                        name='description'
                        label="Описание"
                        variant="standard"
                        value={module.description}
                        onChange={(e) => moduleStore.editModule({id: moduleId, name: e.target.name, value: e.target.value})} />
            </div>
            <div className='mb-4'>
                    <div className='font-normal text-xs text-slate-400 mb-1'>
                        Создан: {createdAtString}
                    </div>
                    <div className='font-normal text-xs text-slate-400'>
                        Изменен: {updatedAtString}
                    </div>
            </div>
            <div className='mb-5'>
                <Button
                    variant="contained"
                    sx={{fontSize: '10pt', fontWeight: 400, backgroundColor: '#60A5FA'}}
                    onClick={() => cardStore.addCard()}>Добавить карточку</Button>
            </div>
            {cards.length ? (
                    <DragDropContext
                        onDragUpdate={handleDragUpdate}
                        onDragEnd={handleDragEnd}>
                        <Droppable droppableId='droppable-id'>
                            {(provided) => (
                                    <div
                                        className='flex flex-col gap-3 pb-10'
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                        {cards.map( (card, idx) => (
                                            <Draggable key={card.id} draggableId={card.id.toString()} index={idx}>
                                            {(provided, snap) => (
                                                    // Added additional Observer otherwise mobx cant rerender state
                                                    <Observer>
                                                        {() => (
                                                                <div
                                                                className={snap.isDragging ? 'opacity-80' : ''}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                >
                                                                <EditCardItem
                                                                    cardIdx={idx}
                                                                    Term={<TextField
                                                                        multiline
                                                                        fullWidth
                                                                        name='term'
                                                                        label="ТЕРМИН"
                                                                        variant="standard"
                                                                        InputLabelProps={{style: {fontSize: 12}}}
                                                                        inputProps={{style: {fontSize: 14}}}
                                                                        value={card.term}
                                                                        onChange={(e) => cardStore.editCard({
                                                                            cardId: card.id,
                                                                            name: e.target.name,
                                                                            value: e.target.value
                                                                        })}/>}
                                                                    Definition={<TextField
                                                                        multiline
                                                                        fullWidth
                                                                        name='definition'
                                                                        label="ОПРЕДЕЛЕНИЕ"
                                                                        variant="standard"
                                                                        InputLabelProps={{style: {fontSize: 12}}}
                                                                        inputProps={{style: {fontSize: 14}}}
                                                                        value={card.definition}
                                                                        onChange={(e) => cardStore.editCard({
                                                                            cardId: card.id,
                                                                            name: e.target.name,
                                                                            value: e.target.value
                                                                        })}/>}
                                                                    DeleteCard={
                                                                        <Button
                                                                            sx={{height: '25px', fontSize: '10pt'}}
                                                                            color='error'
                                                                            variant="text"
                                                                            onClick={() => cardStore.deleteCardById(card.id)}>Удалить</Button>
                                                                        }
                                                                    Image={<CardImage cardId={card.id} url={card.imgUrl} cardStore={cardStore}/>}
                                                                    />
                                                                </div>
                                                        )}
                                                    </Observer>
                                                )}
                                            </Draggable>
                                        ) )}
                                        {provided.placeholder}
                                    </div>
                                )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <Alert severity="info" sx={{ width: '100%' }}>
                        Карточки не найдены!
                    </Alert>
                )}

        </>
    );
});




export { ModuleEditForm }



