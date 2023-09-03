import { observer } from "mobx-react-lite"
import { useState } from 'react'
import { Modal, SvgIcon } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { ICardStore } from 'entities/module';
import { CardsModeStore, TCard } from '../';

interface IProps {
    card: TCard
    moduleId: number,
    cardStore: ICardStore,
    cardsModeStore: CardsModeStore,
    showModal: boolean,
    setShowModal: (newState: boolean ) => void,
}

const FastEditModal = observer(( {card, moduleId, showModal, setShowModal, cardsModeStore, cardStore}: IProps ) => {

    const handleSave = () => {
        cardStore.editCard({ moduleId, cardId: card.id, name: 'term', value: term } )
        cardStore.editCard({ moduleId, cardId: card.id, name: 'definition', value: definition } )

        cardsModeStore.cards[cardsModeStore.currentIdx].term = term
        cardsModeStore.cards[cardsModeStore.currentIdx].definition = definition

        setShowModal(false)
    }

    const handleClose = () => {
        setTerm(card.term)
        setDefinition(card.definition)
        setShowModal(false)
    }

    const [term, setTerm] = useState(card.term)
    const [definition, setDefinition] = useState(card.definition)

    return (
            <Modal
                className='flex justify-center items-center'
                open={showModal}
                onClose={handleClose}
            >
                <div className="rounded-2xl bg-white overflow-hidden">
                    <div className='p-10 flex flex-col relative h-[600px] w-[800px] overflow-y-auto'>
                        <div className='mb-10'>
                            <h1 className='text-2xl font-semibold text-slate-600'>Редактировать</h1>
                        </div>
                        <div className="mb-20 flex-auto">
                            <TextField
                                inputProps={{style: { fontSize: 20 }}}
                                multiline
                                fullWidth
                                name='term'
                                variant="standard"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}/>
                        </div>
                        <div className="mb-10 flex-auto">
                            <TextField
                                inputProps={{style: { fontSize: 20 }}}
                                multiline
                                fullWidth
                                name='definition'
                                variant="standard"
                                value={definition}
                                onChange={(e) => setDefinition(e.target.value)}/>
                        </div>
                        <div className="flex flex-row gap-6 p-4 justify-end">
                            <Button variant='outlined' onClick={handleClose}>Отмена</Button>
                            <Button variant='contained' onClick={handleSave} >Сохранить</Button>
                        </div>
                        <SvgIcon onClick={handleClose}  className='hover:cursor-pointer hover:text-red-200 active:text-red-400 absolute top-4 right-4 text-gray-500 opacity-90' sx={{height: '40px', width: '40px'}}>
                            <CloseIcon/>
                        </SvgIcon>
                    </div>
                </div>

            </Modal>
    )
})

export { FastEditModal }
