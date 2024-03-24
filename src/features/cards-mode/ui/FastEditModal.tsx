import { observer } from "mobx-react-lite"
import { useEffect, useState } from 'react'
import { SvgIcon, Drawer } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { CardStore } from 'entities/module';
import { CardsModeStore, TCard } from '../';

interface IProps {
    card: TCard
    moduleId: number,
    cardStore: CardStore,
    cardsModeStore: CardsModeStore,
    showModal: boolean,
    setShowModal: (newState: boolean ) => void,
}

const FastEditModal = observer(( {card, showModal, setShowModal, cardsModeStore, cardStore}: IProps ) => {

    useEffect(() => {
        setTerm(card.term ?? '')
        setDefinition(card.definition ?? '')
    }, [showModal])


    const handleSave = () => {
        if (term == '') return
        cardStore.editCard({ cardId: card.id, name: 'term', value: term } )
        cardStore.editCard({ cardId: card.id, name: 'definition', value: definition } )
        cardsModeStore.cards[cardsModeStore.currentIdx].term = term
        cardsModeStore.cards[cardsModeStore.currentIdx].definition = definition
        setShowModal(false)
    }

    const [term, setTerm] = useState(card.term)
    const [definition, setDefinition] = useState(card.definition)

    return (
            <Drawer
                anchor="bottom"
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <div className="rounded-2xl bg-white overflow-auto">
                    <div className='p-4 flex flex-col relative overflow-y-auto'>
                        <div className='mb-10'>
                            <h1 className='text-lg font-semibold text-gray-600'>Редактировать</h1>
                        </div>
                        <div className="mb-20 flex-auto">
                            <TextField
                                inputProps={{style: { fontSize: 16 }}}
                                multiline
                                fullWidth
                                name='term'
                                variant="standard"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}/>
                        </div>
                        <div className="mb-10 flex-auto">
                            <TextField
                                inputProps={{style: { fontSize: 16 }}}
                                multiline
                                fullWidth
                                name='definition'
                                variant="standard"
                                value={definition}
                                onChange={(e) => setDefinition(e.target.value)}/>
                        </div>

                        <div className="flex flex-row gap-6 p-4 justify-center">
                            <Button sx={{backgroundColor: '#60A5FA', borderRadius: 3}} variant='contained' onClick={handleSave}>Сохранить</Button>
                            <Button sx={{borderRadius: 3}} variant='outlined' onClick={handleSave}>Отмена</Button>
                        </div>
                    </div>
                </div>

            </Drawer>
    )
})

export { FastEditModal }
