
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import UndoIcon from '@mui/icons-material/Undo';
import Alert from '@mui/material/Alert';
import { observer, Observer } from 'mobx-react-lite';
import { CardRow } from 'entities/module';
import { ModuleStore, CardStore } from 'entities/module';
import { IModuleStore, ICardStore } from 'entities/module';
import { CardImage } from './CardImage';
import { DragDropContext, Draggable, DragUpdate, Droppable, DropResult } from 'react-beautiful-dnd'

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

    return (<_ModuleEditForm
                moduleId={moduleId}
                moduleStore={moduleStore}
                cardStore={cardStore}
            />)
}

const _ModuleEditForm = observer(( { moduleId, moduleStore, cardStore }: IInnerProps ) => {

    useEffect( () => {
        cardStore.refreshCards(moduleId)
        moduleStore.refreshModules()
    }, [])

    const navigate = useNavigate();

    const module = moduleStore.getModuleById(moduleId)
    if (!module) return

    const cards = cardStore.cards;
    if (!cards) return

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

    return (
        <>
            <div className='mb-4'>
                <Button variant='outlined' onClick={ () => navigate(-1) }>
                    <SvgIcon className='mr-2'>
                        <UndoIcon></UndoIcon>
                    </SvgIcon>
                    Вернуться
                </Button>
            </div>
            <div className={'py-2 w-2/6'}>
                <TextField
                    fullWidth
                    name='name'
                    label="Название"
                    variant="standard"
                    value={module.name}
                    onChange={(e) => moduleStore.editModule({id: moduleId, name: e.target.name, value: e.target.value})}/>
            </div>
            <div className={'py-2 mb-5 w-2/6'}>
                    <TextField
                        fullWidth
                        name='description'
                        label="Описание"
                        variant="standard"
                        value={module.description}
                        onChange={(e) => moduleStore.editModule({id: moduleId, name: e.target.name, value: e.target.value})} />
            </div>
            <div className='mb-5'>
                <Button
                    variant="contained"
                    onClick={() => cardStore.addCard(module.id)}>+Добавить карточку</Button>
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
                                                                <CardRow
                                                                    cardIdx={idx}
                                                                    Term={<TextField
                                                                        multiline
                                                                        fullWidth
                                                                        name='term'
                                                                        label="ТЕРМИН"
                                                                        variant="standard"
                                                                        value={card.term}
                                                                        onChange={(e) => cardStore.editCard({
                                                                            moduleId,
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
                                                                        value={card.definition}
                                                                        onChange={(e) => cardStore.editCard({
                                                                            moduleId,
                                                                            cardId: card.id,
                                                                            name: e.target.name,
                                                                            value: e.target.value
                                                                        })}/>}
                                                                    DeleteCard={<Button
                                                                        sx={{height: '25px', fontSize: '10pt'}}
                                                                        color='error'
                                                                        variant="contained"
                                                                        onClick={() => cardStore.deleteCardById(module.id, card.id)}>Удалить</Button>}
                                                                    Image={<CardImage moduleId={moduleId} cardId={card.id} url={card.imgUrl} cardStore={cardStore}/>}
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



