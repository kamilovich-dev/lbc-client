import { useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon';
import BlockIcon from '@mui/icons-material/Block';
import { ButtonFavoriteStar } from "shared/ui/buttons/ButtonFavoriteStar"
import { ButtonEdit } from "shared/ui/buttons/ButtonEdit"
import { CardImageModal } from "shared/ui/modals/CardImageModal"
import TextField from '@mui/material/TextField';

interface IProps {
    cardId: number,
    cardIdx: number,
    termin: string,
    definition: string,
    imgUrl: string | undefined,
    isFavorite: boolean,
    isEditMode: boolean,
    handleSwitchEditMode: (cardIdx: number) => void,
    handleSwitchFavorite: (cardId: number) => void
    handleEditCard: ( cardId: number, name: string, value: string) => void
}

const CardShowRow = ( {cardId, cardIdx, termin, definition, imgUrl, isFavorite, isEditMode, handleSwitchFavorite, handleEditCard, handleSwitchEditMode} : IProps  ) => {

    const [isShowImageModal, setIsShowImageModal] = useState(false)
    const srcUrl = imgUrl ? import.meta.env.VITE_LBC_SERVER_STATIC_URL + '/' + imgUrl : imgUrl

    return (
        <>
            <CardImageModal
                imgUrl={srcUrl || ''}
                isShowImageModal={isShowImageModal}
                setIsShowImageModal={setIsShowImageModal}/>
            <div className='bg-white flex items-start px-4 py-2 gap-4 rounded-lg'>
                <div className='w-4/12'>
                    <TextField
                        multiline
                        fullWidth
                        disabled={isEditMode ? false : true}
                        InputProps={{ disableUnderline: isEditMode ? false : true }}
                        sx={{"& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: 'black',
                        }}}
                        name='term'
                        variant="standard"
                        value={termin}
                        onChange={(e) => handleEditCard(
                            cardId,
                            e.target.name,
                            e.target.value)}
                        />
                </div>
                <div className='self-stretch border-r-2 border-gray-100'></div>
                <div className='w-4/12'>
                        <TextField
                            multiline
                            fullWidth
                            disabled={isEditMode ? false : true}
                            InputProps={{ disableUnderline: isEditMode ? false : true }}
                            sx={{"& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: 'black',
                            }}}
                            name='definition'
                            variant="standard"
                            value={definition}
                            onChange={(e) => handleEditCard(
                                cardId,
                                e.target.name,
                                e.target.value)}
                            />
                </div>
                <div className='w-2/12'>
                    <div className='h-24 rounded-sm overflow-hidden w-full hover:cursor-zoom-in hover:ring-2 hover:ring-blue-100 active:ring-blue-200'
                        onClick={() => setIsShowImageModal(true)}>
                        { srcUrl ?  <img src={srcUrl} className='h-full w-full object-cover'></img>
                            : (<SvgIcon sx={{ width: '100%', height: '100%' }} className='text-gray-300'>
                                <BlockIcon />
                              </SvgIcon>)}
                    </div>
                </div>
                <div className='flex w-2/12 justify-end'>
                    <div className='mr-1'>
                        <ButtonFavoriteStar isFavorite={isFavorite} onClick={() => handleSwitchFavorite(cardId)}/>
                    </div>
                    <div>
                        <ButtonEdit isEdit={isEditMode} onClick={() => handleSwitchEditMode(cardIdx)} />
                    </div>
                </div>
            </div>
        </>

    )
}

export { CardShowRow }