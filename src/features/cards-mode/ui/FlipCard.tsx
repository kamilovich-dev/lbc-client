import { useState } from 'react'
import { TCard } from "features/cards-mode"
import { Help } from "./Help"
import TextField from '@mui/material/TextField';
import { CardImageModal } from "shared/ui/image-modal/CardImageModal"

interface IProps {
    card: TCard,
}

const FlipCard = ( { card }: IProps ) => {
    const imgUrl = card.imgUrl ? import.meta.env.VITE_LBC_SERVER_STATIC_URL + '/' + card.imgUrl : card.imgUrl

    const [isShowImageModal, setIsShowImageModal] = useState(false)

    return (
        <>
            <CardImageModal
                imgUrl={imgUrl}
                isShowImageModal={isShowImageModal}
                setIsShowImageModal={setIsShowImageModal}
            />

            <div className='group flex flex-col w-full h-full justify-center [perspective:1000px]'>
                <div className="h-full w-full group-hover:[transform:rotateX(180deg)] [transform-style:preserve-3d] transition-all duration-700">
                    <div className='p-4 absolute flex justify-center items-center inset-0 h-full w-full px-12 text-center [backface-visibility:hidden] bg-white rounded-xl shadow-sm shadow-black/40'>
                        <div className='text-7xl text-slate-800'>
                                <TextField
                                    multiline
                                    fullWidth
                                    disabled={true}
                                    InputProps={{ disableUnderline: true }}
                                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: 'black',
                                    },
                                        resize: {
                                            fontSize: '100'
                                        }
                                    }}
                                    name='term'
                                    variant="standard"
                                    value={card.term}
                                />
                        </div>
                    </div>
                    <div className='p-10 absolute flex gap-2 items-center inset-0 [transform:rotateX(180deg)] [backface-visibility:hidden] bg-white rounded-xl shadow-sm shadow-black/40'>
                        <div className='w-1/2 text-2xl text-slate-800'>
                                <TextField
                                    multiline
                                    fullWidth
                                    disabled={true}
                                    InputProps={{ disableUnderline: true }}
                                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: 'black',
                                    }}}
                                    name='term'
                                    variant="standard"
                                    value={card.definition}
                                />
                        </div>
                        <div className='w-1/2 h-full  hover:cursor-zoom-in hover:ring-2 rounded-xl shadow-xl overflow-hidden shadow-black/40' onClick={() => setIsShowImageModal(true)}>
                            <img src={imgUrl} className='h-full w-full object-cover'></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { FlipCard }