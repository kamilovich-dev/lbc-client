import React, { useReducer } from 'react';
import useStyles from './jssView';
import { Form, useParams, Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { getModules } from 'data/module-row';
import moduleEditReducer from './moduleEditReducer';
import Card from 'routes/moduleId/edit/components/Card/Card';

export default function ModuleEditView() {
    const jss = useStyles();
    const params = useParams();
    const moduleId = params.moduleId;
    const [module, dispatch] = useReducer(moduleEditReducer, getModules().find(item => item.id == moduleId));

    function handleChangeHead(e) {
        dispatch({
            type: 'changedHead',
            name: e.target.name,
            value: e.target.value,
        });
    }

    function handleChangeCard(card, e) {
        dispatch({
            type: 'changedCard',
            name: e.target.name,
            value: e.target.value,
            card: card
        })
    }

    function handleAddCard() {
        dispatch({
            type: 'addedCard',
        })
    }

    function handleSwapTermins() {
        dispatch({
            type: 'swappedTermins',
        })
    }

    function handleRemoveCard(card) {
        dispatch({
            type: 'removedCard',
            card: card,
        })

    }

	function handleDragEnd(result) {
        dispatch({
            type: 'dragEnded',
            result: result,
        })
	};

    return (
        <>

        <Form className={jss.wrapper}>
            <div className={jss.headWrapper}>
                <span className={jss.pageName}>Редактирование модуля</span>
                <label className={jss.name}>
                    НАЗВАНИЕ
                    <input
                        name='name'
                        type='text'
                        placeholder='Введите название'
                        value={module.name}
                        onChange={handleChangeHead}
                        />
                </label>
                <label className={jss.description}>
                    ОПИСАНИЕ
                    <input
                        name='description'
                        type='text'
                        placeholder='Введите описание'
                        value={module.description}
                        onChange={handleChangeHead}
                        />
                </label>
            </div>
            <button className={jss.addCardButton} onClick={handleAddCard}>Добавить карточку</button>
            <button className={jss.swapTermins} onClick={handleSwapTermins}>Поменять местами термины и определения</button>
            <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="muColumn">
                        {(provided, snap) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {module.cards.map((card, index) => (
                                    <Draggable
                                        key={card.id}
                                        draggableId={(card.id).toString()}
                                        index={index}
                                    >
                                        {(provided, snap) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Card
                                                    isDragging = {snap.isDragging}
                                                    card = {card}
                                                    handleChangeCard = {handleChangeCard}
                                                    handleRemoveCard = {handleRemoveCard} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            <Link className={jss.accept} to='..\'>Применить</Link>
        </Form>
        </>

    );
}