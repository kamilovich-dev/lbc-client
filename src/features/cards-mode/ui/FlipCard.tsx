import { useState } from 'react'
import { observer } from "mobx-react-lite"
import TextField from '@mui/material/TextField';

import { CardsModeStore } from "features/cards-mode"
import { CardStore} from "entities/module"
import { Help } from "./Help"
import { ButtonEdit } from 'shared/ui/button-edit/ButtonEdit';
import { FavoriteStar } from 'shared/ui/favorite-star/FavoriteStar';
import { CardImageModal } from "shared/ui/image-modal/CardImageModal"
import { FastEditModal } from './FastEditModal';


import { useSpring, animated } from '@react-spring/web';

interface IProps {
    moduleId: number,
    cardsModeStore: CardsModeStore,
    cardStore: CardStore,
}

const FlipCard = observer(( { cardsModeStore, moduleId, cardStore }: IProps ) => {
    const card = cardsModeStore.cards[cardsModeStore.currentIdx]
    if (!card) return

    const imgUrl = card.imgUrl ? import.meta.env.VITE_LBC_SERVER_STATIC_URL + '/' + card.imgUrl : card.imgUrl

    const [isShowImageModal, setIsShowImageModal] = useState(false)
    const [isShowFastEditModal, setIsShowFastEditModal] = useState(false)

    const { transform } = useSpring({
      transform: `perspective(1200px) rotateX(${cardsModeStore.cardFlipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80, duration: 400 },
    })

    const head = (
        <div className='p-2 flex gap-4 mb-4'>
            <div className='w-3/4'>
                <Help
                    showHelp={cardsModeStore.helpShown}
                    helpText={cardsModeStore.getHelpText()}
                    handleClick={(e) => {e.stopPropagation();
                        cardsModeStore.showHelp()}}/>

            </div>
            <div className='flex w-1/4 gap-2 justify-end'>
                <ButtonEdit
                    onClick={(e) => {e.stopPropagation();
                        setIsShowFastEditModal(true)}}/>
                <FavoriteStar
                    isFavorite={card.isFavorite}
                    onClick={(e) => {e.stopPropagation();
                        cardStore.editCard( {moduleId, cardId: card.id, isSwitchFavorite: true} );
                        cardsModeStore.cards[cardsModeStore.currentIdx].isFavorite = cardStore.getCardById(card.id)?.isFavorite }}
                    />
            </div>
        </div>
    )

    const front = (
        <animated.div style={{ transform }} className='absolute inset-0 p-4 flex flex-col text-center [backface-visibility:hidden] bg-white rounded-xl shadow-sm shadow-black/40'>
            {head}
            <div className='flex-auto flex items-center justify-center text-7xl text-slate-800 text-center w-full overflow-y-auto'>
                <div className='max-h-full'>
                    <TextField
                        multiline
                        fullWidth
                        inputProps={{style: { textAlign: 'center', fontSize: 24 }}}
                        InputProps={{ disableUnderline: true, readOnly: true}}
                        sx={{"& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: 'black'},
                            '& :hover': { cursor: 'pointer' }}}
                        name='term'
                        variant="standard"
                        value={card.term}
                    />
                </div>
            </div>
        </animated.div>
    )

    const back = (
        <animated.div style={{ transform, rotateX: '180deg' }} className='absolute inset-0 p-4 flex flex-col [backface-visibility:hidden] bg-white rounded-xl shadow-sm shadow-black/40'>
            {head}
            <div className='flex gap-8 items-center flex-auto overflow-y-auto pr-4'>
                <div className='w-1/2 h-full text-2xl text-slate-800 flex flex-col justify-center overflow-y-auto '>
                    <div className='max-h-full'>
                        <TextField
                            multiline
                            fullWidth
                            inputProps={{style: { textAlign: 'center', fontSize: 24 }}}
                            InputProps={{ disableUnderline: true, readOnly: true}}
                            sx={{"& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: 'black'},
                                '& :hover': { cursor: 'pointer' }}}
                            name='term'
                            variant="standard"
                            value={card.definition}
                        />
                    </div>
                </div>
                <div className='w-1/2 h-1/2 hover:cursor-zoom-in hover:ring-2 rounded-xl shadow-xl overflow-hidden shadow-black/40' onClick={(e) => { e.stopPropagation(); setIsShowImageModal(true)} }>
                    <img src={imgUrl} className='h-full w-full object-cover'></img>
                </div>
            </div>
        </animated.div>
    )

    return (
        <>
            <div className='[transform-style:preserve-3d] hover:cursor-pointer h-full w-full' onClick={cardsModeStore.flipCard}>
                {front}
                {back}
            </div>
            <CardImageModal
                imgUrl={imgUrl}
                isShowImageModal={isShowImageModal}
                setIsShowImageModal={setIsShowImageModal}
            />
            <FastEditModal
                card={card}
                moduleId={moduleId}
                cardStore={cardStore}
                cardsModeStore={cardsModeStore}
                setShowModal={setIsShowFastEditModal}
                showModal={isShowFastEditModal}/>
        </>
    )
})

export { FlipCard }

