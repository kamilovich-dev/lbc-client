import { observer } from "mobx-react-lite"
import { Modal, SvgIcon, Drawer } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Hotkeys } from "features/modes/cards-mode";
import { TAnswer } from "../model/CardsModeStore";
import { useMobile } from "shared/mobile/useMobile";

import { CardsModeStore } from '../';

interface IProps {
    cardsModeStore: CardsModeStore,
    showModal: boolean,
    setShowModal: (newState: boolean ) => void,
}

const ParametersModal = observer(( {showModal, setShowModal, cardsModeStore}: IProps ) => {
    const isMoble = useMobile()

    return (
        <Drawer
            anchor="bottom"
            open={showModal}
            onClose={() => setShowModal(false)}
        >
            <div className="rounded-2xl bg-white overflow-auto">
                <div className='p-10 flex flex-col relative overflow-y-auto md-max:p-4'>
                    <div className='mb-10 md-max:mb-8'>
                        <h1 className='text-3xl font-semibold text-gray-600 md-max:text-lg'>Параметры</h1>
                    </div>
                    <div className="flex gap-2 items-center border-b-[1px] border-gray-100 pb-4">
                        <div className='w-full'>
                            <h2 className='text-gray-500 font-semibold text-lg md-max:text-base'>Сортировка карточек</h2>
                        </div>
                        <div>
                            <Switch
                                checked={cardsModeStore.cardsSorted}
                                onChange={cardsModeStore.sortCards}/>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center border-b-[1px] border-gray-100 py-4">
                        <div className='w-full'>
                            <h2 className='text-gray-500 font-semibold text-lg md-max:text-base'>Изучать только термины с ★</h2>
                        </div>
                        <div>
                            <Switch
                                checked={cardsModeStore.onlyStarsOn}
                                onChange={cardsModeStore.onlyStars}
                                disabled={cardsModeStore.cardsWithStarCount == 0}/>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center border-b-[1px] border-gray-100 py-4">
                        <div className='w-full'>
                            <h2 className='text-gray-500 font-semibold text-lg md-max:text-base'>Ответ</h2>
                        </div>
                        <div>
                        <Select
                            style={{ padding: '0px' }}
                            onChange={e => cardsModeStore.changeAnswer(e.target.value as TAnswer)}
                            value={cardsModeStore.whatInAnswer}
                        >
                            <MenuItem value='term'>Термины</MenuItem>
                            <MenuItem value='definition'>Определения</MenuItem>
                            <MenuItem value='both'>Термины и определения</MenuItem>
                        </Select>
                        </div>
                    </div>
                    {isMoble ? null
                        : <div className="flex flex-col gap-2 border-b-[1px] border-gray-100">
                            <Hotkeys/>
                        </div>}
                    <div className="flex gap-2 items-center py-4 group">
                        <h2 className='text-red-600 font-semibold text-lg group-hover:text-red-700 group-hover:cursor-pointer md-max:text-base'
                            onClick={() => { cardsModeStore.restart(); setShowModal(false) }}>Пройти карточки заново</h2>
                    </div>

                </div>
            </div>

        </Drawer>
    )
})

export { ParametersModal }
