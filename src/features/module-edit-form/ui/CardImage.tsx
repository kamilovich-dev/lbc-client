import { ICardStore } from 'entities/module'
import SvgIcon from '@mui/material/SvgIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { observer } from 'mobx-react-lite';

interface IProps {
    moduleId: number,
    cardId: number,
    url: string,
    cardStore: ICardStore
}

const CardImage = observer(( { moduleId, cardId, url, cardStore }: IProps ) => {

  const imgUrl = url ? import.meta.env.VITE_LBC_SERVER_STATIC_URL + '/' + url : url
  const inputId = `file-input-${cardId}`

  return (
    <>
        <div className='relative '>
          <label htmlFor={inputId}>
            { imgUrl ? (
              <img src={imgUrl}></img>
            ) : (
              <div className='border-2 border-dashed flex flex-col items-center '>
                <div className='text-gray-500'>
                  <SvgIcon >
                    <AddPhotoAlternateIcon />
                  </SvgIcon>
                </div>
                <div>
                  Изображение
                </div>
              </div>

            ) }
          </label>

          <input hidden type='file' id={inputId} onChange={
            e => {
              console.log('change')
              cardStore?.editCard( { moduleId, cardId, image: e.target.files ? e.target.files[0] : undefined })
          }}>
          </input>

          {imgUrl ? (
            <div className='p-1 flex justify-center items-center absolute top-1 right-1 text-gray-800 w-10 h-10 bg-slate-100 rounded-full hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300'>
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
