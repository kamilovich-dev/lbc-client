import { observer } from "mobx-react-lite"
import { Modal, SvgIcon } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TAnswer } from "../model/CardsModeStore";

import { CardsModeStore } from '../';

interface IProps {
    cardsModeStore: CardsModeStore,
    showModal: boolean,
    setShowModal: (newState: boolean ) => void,
}

const ParametersModal = observer(( {showModal, setShowModal, cardsModeStore}: IProps ) => {
    const cardsWithStarCount = cardsModeStore.cards.reduce( (accumulator, currentValue) => currentValue.isFavorite ? 1 : 0, 0 )

    return (
            <Modal
                className='flex justify-center items-center'
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <div className="rounded-2xl bg-white overflow-hidden">
                    <div className='p-10 flex flex-col relative h-[600px] w-[800px] overflow-y-auto'>
                        <div className='mb-10'>
                            <h1 className='text-3xl font-semibold text-slate-900'>Параметры</h1>
                        </div>
                        <div className="flex gap-2 items-center border-b-[1px] border-gray-100 pb-4">
                            <div className='w-full'>
                                <h2 className='text-slate-700 font-semibold text-lg'>Сортировка карточек</h2>
                            </div>
                            <div>
                                <Switch
                                    checked={cardsModeStore.cardsSorted}
                                    onChange={cardsModeStore.sortCards}/>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center border-b-[1px] border-gray-100 py-4">
                            <div className='w-full'>
                                <h2 className='text-slate-700 font-semibold text-lg'>Изучать только термины с ★</h2>
                            </div>
                            <div>
                                <Switch
                                    checked={cardsModeStore.onlyStarsOn}
                                    onChange={cardsModeStore.onlyStars}
                                    disabled={cardsWithStarCount == 0}/>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center border-b-[1px] border-gray-100 py-4">
                            <div className='w-full'>
                                <h2 className='text-slate-700 font-semibold text-lg'>Ответ</h2>
                            </div>
                            <div>
                            <Select
                                onChange={e => cardsModeStore.changeAnswer(e.target.value as TAnswer)}
                                value={cardsModeStore.whatInAnswer}
                            >
                                <MenuItem value='term'>Термины</MenuItem>
                                <MenuItem value='definition'>Определения</MenuItem>
                                <MenuItem value='both'>Термины и определения</MenuItem>
                            </Select>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center py-4 group">
                            <h2 className='text-red-600 font-semibold text-lg group-hover:text-red-700 group-hover:cursor-pointer'
                                onClick={() => { cardsModeStore.restart(); setShowModal(false) }}>Пройти карточки заново</h2>
                        </div>
                        <SvgIcon onClick={() => setShowModal(false)}  className='hover:cursor-pointer hover:text-red-200 active:text-red-400 absolute top-4 right-4 text-gray-500 opacity-90' sx={{height: '40px', width: '40px'}}>
                            <CloseIcon/>
                        </SvgIcon>
                    </div>
                </div>

            </Modal>
    )
})

export { ParametersModal }
