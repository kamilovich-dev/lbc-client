import { Modal, SvgIcon } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    imgUrl: string,
    isShowImageModal: boolean,
    setIsShowImageModal: ( newState: boolean ) => void
}

const CardImageModal = ( {imgUrl, isShowImageModal, setIsShowImageModal}: IProps ) => {

    return (
            <Modal
                className='flex items-center justify-center'
                open={isShowImageModal}
                onClose={() => setIsShowImageModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='max-h-full max-w-full h-fit w-fit relative'>
                <img className='object-cover max-w-full max-h-full' src={imgUrl}></img>
                <SvgIcon onClick={() => setIsShowImageModal(false)}  className='hover:cursor-pointer hover:text-red-200 active:text-red-400 absolute top-2 right-2 text-gray-500 bg-gray-400 opacity-90' sx={{height: '60px', width: '60px'}}>
                    <CloseIcon/>
                </SvgIcon>
                </div>
            </Modal>
    )
}

export { CardImageModal }