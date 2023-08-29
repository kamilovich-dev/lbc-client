import { useState } from 'react'
import { FavoriteStar } from "shared/ui/favorite-star/FavoriteStar"
import { ButtonEdit } from "shared/ui/button-edit/ButtonEdit"
import { CardImageModal } from "features/module-edit-form"

interface IProps {
    termin: string,
    definition: string,
    imgUrl: string | undefined,
    isFavorite: boolean,
    handleFavoriteClick: (args: any) => void
    handleEditClick: ( args: any) => void
}

const CardShowRow = ( {termin, definition, imgUrl, isFavorite, handleFavoriteClick, handleEditClick} : IProps  ) => {

    const [isShowImageModal, setIsShowImageModal] = useState(false)
    const srcUrl = imgUrl ? import.meta.env.VITE_LBC_SERVER_STATIC_URL + '/' + imgUrl : imgUrl

    return (
        <>
            <CardImageModal
                imgUrl={srcUrl || ''}
                isShowImageModal={isShowImageModal}
                setIsShowImageModal={setIsShowImageModal}/>

            <div className='bg-white flex items-center px-4 py-2 rounded-lg'>
                <div className='w-4/12 border-r-2 border-gray-100 mr-4 leading-10'>{termin}</div>
                <div className='w-4/12'>{definition}</div>
                <div className='w-2/12'>
                    <div className='h-14 rounded-sm overflow-hidden w-full hover:cursor-zoom-in hover:ring-2 hover:ring-blue-100 active:ring-blue-200'
                        onClick={() => setIsShowImageModal(true)}>
                        <img src={srcUrl} className='h-full w-full object-cover'></img>
                    </div>
                </div>
                <div className='flex w-2/12 justify-end'>
                    <div className='mr-1'>
                        <FavoriteStar isFavorite={isFavorite} onClick={handleFavoriteClick}/>
                    </div>
                    <div>
                        <ButtonEdit onClick={handleEditClick} />
                    </div>
                </div>
            </div>
        </>

    )
}

export { CardShowRow }