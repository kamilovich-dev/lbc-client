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
    isOwner: boolean | undefined,
    isFavorite: boolean,
    isEditMode: boolean,
    handleSwitchEditMode: (cardIdx: number) => void,
    handleSwitchFavorite: (cardId: number) => void
    handleEditCard: ( cardId: number, name: string, value: string) => void
}

const CardShowRow = ( {cardId, cardIdx, termin, definition, imgUrl, isFavorite, isOwner, isEditMode, handleSwitchFavorite, handleEditCard, handleSwitchEditMode} : IProps  ) => {

    const [isShowImageModal, setIsShowImageModal] = useState(false)
    const srcUrl = imgUrl ? import.meta.env.VITE_LBC_SERVER_STATIC_URL + '/' + imgUrl : imgUrl

    return (
        <>
            <CardImageModal
                imgUrl={srcUrl || ''}
                isShowImageModal={isShowImageModal}
                setIsShowImageModal={setIsShowImageModal}/>
            <div className='bg-white flex rounded-lg shadow-md'>
                <div className='flex items-start px-4 pr-1 py-1 gap-4 w-full '>
                    <div className='w-5/12 flex flex-col  h-full'>
                        <div className='flex-auto '>
                            <TextField
                                multiline
                                fullWidth
                                disabled={isEditMode ? false : true}
                                inputProps={{style: {fontSize: 12}}}
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
                        {srcUrl ?
                        <div className='py-2 '>
                            <div className='h-24 w-24 rounded-md overflow-hidden hover:cursor-zoom-in hover:ring-2 hover:ring-blue-100 active:ring-blue-200'
                                onClick={() => setIsShowImageModal(true)}>
                                <img src={srcUrl} className='h-full w-full object-cover border-[1px] border-gray-100'></img>
                            </div>
                        </div> : null}

                    </div>
                    <div className='self-stretch border-r-2 border-gray-100'></div>
                    <div className='w-5/12'>
                        <TextField
                                multiline
                                fullWidth
                                disabled={isEditMode ? false : true}
                                inputProps={{style: {fontSize: 12}}}
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
                    <div className='flex w-2/12 justify-end'>
                        {isOwner ?
                        <div className=''>
                            <ButtonFavoriteStar isFavorite={isFavorite} onClick={() => handleSwitchFavorite(cardId)}/>
                        </div> : null}
                        {/* <div>
                            <ButtonEdit isEdit={isEditMode} onClick={() => handleSwitchEditMode(cardIdx)} />
                        </div> */}
                    </div>
                </div>

            </div>
        </>

    )
}

export { CardShowRow }