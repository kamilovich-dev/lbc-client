import { useState } from 'react'
import { observer } from "mobx-react-lite"
import SvgIcon from '@mui/material/SvgIcon';
import BlockIcon from '@mui/icons-material/Block';
import TextField from '@mui/material/TextField';

import { CardsModeStore } from "features/cards-mode"
import { CardStore} from "entities/module"
import { Help } from "./Help"
import { ButtonEdit } from 'shared/ui/buttons/ButtonEdit';
import { ButtonFavoriteStar } from 'shared/ui/buttons/ButtonFavoriteStar';
import { CardImageModal } from "shared/ui/modals/CardImageModal"
import { FastEditModal } from './FastEditModal';

import { animated } from '@react-spring/web';

interface IProps {
    moduleId: number,
    cardsModeStore: CardsModeStore,
    cardStore: CardStore,
    externalRef?: React.RefObject<any>,
}

const FlipCard = observer(( { cardsModeStore, moduleId, cardStore, externalRef }: IProps ) => {
    const card = cardsModeStore.cards[cardsModeStore.currentIdx]
    if (!card) return

    const imgUrl = card.imgUrl ? import.meta.env.VITE_LBC_SERVER_STATIC_URL + '/' + card.imgUrl : card.imgUrl

    const [isShowImageModal, setIsShowImageModal] = useState(false)
    const [isShowFastEditModal, setIsShowFastEditModal] = useState(false)



    const head = (
        <div className='p-2 flex gap-4 mb-4'>
            <div className='w-3/4'>
                {cardsModeStore.cardFlipped || cardsModeStore.whatInAnswer == 'both' ? null
                    :  <Help
                        showHelp={cardsModeStore.helpShown}
                        helpText={cardsModeStore.getHelpText()}
                        handleClick={(e) => {e.stopPropagation();
                        cardsModeStore.showHelp()}}/>
                }
            </div>
            <div className='flex w-1/4 gap-2 justify-end'>
                <ButtonEdit
                    onClick={(e) => {e.stopPropagation();
                        setIsShowFastEditModal(true)}}/>
                <ButtonFavoriteStar
                    isFavorite={card.isFavorite}
                    onClick={(e) => {e.stopPropagation();
                        cardStore.editCard( {moduleId, cardId: card.id, isSwitchFavorite: true} );
                        cardsModeStore.cards[cardsModeStore.currentIdx].isFavorite = cardStore.getCardById(card.id)?.isFavorite }
                    }
                    />
            </div>
        </div>
    )

    const frontInitialClassName= cardsModeStore.whatInAnswer == 'term' ? '[transform:rotateX(180deg)]' : ''
    const backInitialClassName = cardsModeStore.whatInAnswer == 'definition' ? '[transform:rotateX(180deg)]' : ''

    const front = (
        <div className={`${frontInitialClassName} absolute inset-0 p-4 flex flex-col text-center [backface-visibility:hidden] bg-white rounded-xl shadow-sm shadow-black/40`}>
            {head}
            <div className='flex-auto flex items-center justify-center text-7xl text-slate-800 text-center w-full overflow-y-auto'>
                <div className='max-h-full'>
                    <TextField
                        multiline
                        fullWidth
                        inputProps={{style: { textAlign: 'center', fontSize: 30 }}}
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
        </div>
    )

    const back = (
        <div className={`${backInitialClassName} absolute inset-0 p-4 flex flex-col [backface-visibility:hidden] bg-white rounded-xl shadow-sm shadow-black/40`}>
            {head}
            <div className='flex gap-8 items-center flex-auto overflow-y-auto pr-4'>
                <div className='w-1/2 h-full text-2xl text-slate-800 flex flex-col justify-center overflow-y-auto '>
                    <div className='max-h-full'>
                        <TextField
                            multiline
                            fullWidth
                            inputProps={{style: { textAlign: 'center', fontSize: 30 }}}
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
                    { imgUrl ? <img src={imgUrl} className='h-full w-full object-cover'></img>
                        : <SvgIcon sx={{ width: '100%', height: '100%' }} className='text-gray-300'>
                            <BlockIcon />
                        </SvgIcon> }
                </div>
            </div>
        </div>
    )

    const both = (
        <div className='absolute inset-0 flex flex-col'>
            <div className='mb-6 h-1/2 flex flex-col flex-auto text-7xl text-slate-800 text-center w-full overflow-y-auto bg-white rounded-xl shadow-sm shadow-black/40'>
                <div className='pr-2 pt-2'>
                    {head}
                </div>
                <div className='max-h-full  flex-auto flex items-center'>
                    <TextField
                        multiline
                        fullWidth
                        inputProps={{style: { textAlign: 'center', fontSize: 30 }}}
                        InputProps={{ disableUnderline: true, readOnly: true}}
                        sx={{"& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: 'black'},
                            '& :hover': { cursor: '' }}}
                        name='term'
                        variant="standard"
                        value={card.term}
                    />
                </div>
            </div>
            <div className='flex h-1/2 gap-8 items-center flex-auto overflow-y-auto pr-4 bg-white rounded-xl shadow-sm shadow-black/40'>
                <div className='w-1/2 h-full text-2xl text-slate-800 flex flex-col justify-center overflow-y-auto '>
                    <div className='max-h-full'>
                        <TextField
                            multiline
                            fullWidth
                            inputProps={{style: { textAlign: 'center', fontSize: 30 }}}
                            InputProps={{ disableUnderline: true, readOnly: true}}
                            sx={{"& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: 'black'},
                                '& :hover': { cursor: '' }}}
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
        </div>
    )
    return (
        <>

            <animated.div className={`[transform-style:preserve-3d] h-full w-full ${cardsModeStore.whatInAnswer == 'both' ? '' : 'hover:cursor-pointer'}`}
                style={ cardsModeStore.cardAnimation.controller.springs }
                onClick={cardsModeStore.flipCard}
                ref={externalRef}>
                {cardsModeStore.whatInAnswer == 'both' ?
                    both :
                    <>{front}{back}</>}

                <animated.div
                    style={cardsModeStore.cardAnimation.unknownController.springs}
                    onClick={e => e.preventDefault()}
                    className={`z-2 absolute hover:cursor-default inset-0 flex flex-col items-center justify-center text-5xl font-bold text-orange-500 border-2 border-orange-300 w-full h-full bg-white rounded-xl`}>
                        Еще изучаю
                </animated.div>

                <animated.div
                    style={cardsModeStore.cardAnimation.knownController.springs}
                    onClick={e => e.preventDefault()}
                    className={`z-2 absolute hover:cursor-default inset-0 flex flex-col items-center justify-center text-5xl font-bold text-green-500 border-2 border-green-300 w-full h-full bg-white rounded-xl`}>
                        ЗНАЮ
                </animated.div>

                <animated.div
                    style={cardsModeStore.cardAnimation.cancelController.springs}
                    onClick={e => e.preventDefault()}
                    className={`z-2 absolute inset-0 w-full h-full bg-white rounded-xl`}>
                        <>
                        {cardsModeStore.whatInAnswer == 'both' ?
                            both :
                            <>{front}{back}</>}
                        </>
                </animated.div>
            </animated.div>

            <CardImageModal
                imgUrl={imgUrl}
                isShowImageModal={isShowImageModal}
                setIsShowImageModal={setIsShowImageModal}
            />
            {isShowFastEditModal ? <FastEditModal
                card={card}
                moduleId={moduleId}
                cardStore={cardStore}
                cardsModeStore={cardsModeStore}
                setShowModal={setIsShowFastEditModal}
                showModal={isShowFastEditModal}/> : null}
        </>
    )
})

export { FlipCard }

