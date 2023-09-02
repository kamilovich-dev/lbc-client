import { ICardStore } from 'entities/module'
import { useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { observer } from 'mobx-react-lite';
import { CardImageModal } from 'shared/ui/image-modal/CardImageModal'

interface IProps {
    moduleId: number,
    cardId: number,
    url?: string,
    cardStore: ICardStore
}

const CardImage = observer(( { moduleId, cardId, url, cardStore }: IProps ) => {

  const imgUrl = url ? import.meta.env.VITE_LBC_SERVER_STATIC_URL + '/' + url : url
  const inputId = `file-input-${cardId}`
  const [isShowImageModal, setIsShowImageModal] = useState(false)

  return (
    <>
        <CardImageModal
          isShowImageModal={isShowImageModal}
          setIsShowImageModal={setIsShowImageModal}
          imgUrl={imgUrl || ''}/>

        <div className='relative h-16 w-full '>
            { imgUrl ? (
                <div className='h-full w-full hover:cursor-zoom-in hover:ring-2 hover:ring-blue-100 active:ring-blue-200'
                  onClick={() => setIsShowImageModal(true)}>
                  <img src={imgUrl} className='h-full w-full object-cover'></img>
                </div>
            ) : (
              <label htmlFor={inputId}>
                <div className='h-full border-2 border-dashed flex flex-col items-center justify-center hover:cursor-pointer hover:bg-blue-100 active:bg-blue-200'>
                  <div className='text-gray-500'>
                    <SvgIcon >
                      <AddPhotoAlternateIcon />
                    </SvgIcon>
                  </div>
                  <div>
                    Изображение
                  </div>
                </div>
              </label>
            ) }


          <input hidden type='file' id={inputId} onChange={
            e => {
              console.log('change')
              cardStore?.editCard( { moduleId, cardId, image: e.target.files ? e.target.files[0] : undefined })
          }}>
          </input>

          {imgUrl ? (
            <div className='p-1 flex justify-center items-center absolute top-1 right-1 text-gray-500 w-8 h-8 bg-slate-100 rounded-full hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300'>
              <SvgIcon sx={{width: '100%', height: '100%'}} onClick={() => {
                const input = document.getElementById(inputId)
                //@ts-ignore
                if (input) input.value = null
                cardStore?.editCard( { moduleId, cardId, isDeleteImg: true })
              }}>
                <DeleteIcon />
              </SvgIcon>
            </div>
          ) : null}

        </div>
    </>
  )
})

export { CardImage }
