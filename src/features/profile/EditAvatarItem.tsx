import SvgIcon from '@mui/material/SvgIcon';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect, useState } from 'react';
import { Button } from '@mui/material';

interface IProps {
    avatarFile: File | undefined,
    setAvatarFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export const EditAvatarItem = observer(( { avatarFile, setAvatarFile}: IProps ) => {

  const [imageNode, setImageNode] = useState<ReactNode | null>(null)
  const fileInputId = `file-input`

  useEffect(() => {
    if (avatarFile) {
        const img = React.createElement('img', {
            src: URL.createObjectURL(avatarFile),
            className: 'h-full w-full object-cover',
        })
        setImageNode(img)
    } else setImageNode(null)
  }, [avatarFile])

  const handleChange = (file: File | undefined) => {
    if (file) {
      const format = file.name.split('.').pop()
      if (format !== 'png' && format !== 'jpg' && format !== 'jpeg') {
        setAvatarFile(undefined)
        return
      }
    }
    setAvatarFile(file)
  }

  const handleDelete = () => {
    const input = document.getElementById(fileInputId) as HTMLInputElement
    if (input) input.value = ''
    setAvatarFile(undefined)
  }

  return (
    <>
        <div className='relative h-full w-full flex flex-col items-center gap-2'>
            { avatarFile ? (
                <div className='h-[150px] w-[150px] border-[2px] border-blue-200 rounded-full overflow-hidden hover:cursor-zoom-in hover:ring-2 hover:ring-blue-100 active:ring-blue-200'>
                  {imageNode}
                </div>
            ) : (
              <label htmlFor={fileInputId}>
                <div className='h-[150px] w-[150px] rounded-full border-2 border-dashed flex flex-col items-center justify-center hover:cursor-pointer hover:bg-blue-100 active:bg-blue-200'>
                  <div className='text-gray-400'>
                    <SvgIcon sx={{height: 50, width: 50}}>
                      <AddPhotoAlternateIcon />
                    </SvgIcon>
                  </div>
                </div>
              </label>
            ) }

          <input hidden type='file' id={fileInputId} onChange={e => handleChange(  e.target.files ? e.target.files[0] : undefined)}>
          </input>
          {avatarFile ? (
            <div >
              <Button onClick={handleDelete}>Очистить</Button>
           </div>
          ) : null}

        </div>
    </>
  )
})

