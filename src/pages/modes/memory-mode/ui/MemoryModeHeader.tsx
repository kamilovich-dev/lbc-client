import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { MemoryModeStore } from 'features/modes/memory-mode';
import { observer } from "mobx-react-lite"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MemoryModeSettings } from "./MemoryModeSettings";

interface IProps {
    memoryModeStore: MemoryModeStore,
}

export const MemoryModeHeader = observer(( { memoryModeStore }: IProps ) => {

    const navigate = useNavigate()
    const [isShowModal, setIsShowModal] = useState(false)

    const handleClick = () => {
        setIsShowModal(true)
    }

    return (
        <>
            <div className="h-[50px] p-2 bg-white flex items-center gap-4">
                <div className='text-gray-400 flex items-center flex-auto' onClick={() => navigate(-1)}>
                    <CloseIcon sx={{height: 30, width: 30}}/>
                </div>
                <div className='text-gray-400 font-semibold text-lg flex items-center flex-auto' >
                    {memoryModeStore.result.currentCardIndex + 1} / { memoryModeStore.result.totalCount }
                </div>
                <div className='text-gray-400 flex items-center' onClick={memoryModeStore.start}>
                    <RestartAltIcon sx={{height: 30, width: 30}}/>
                </div>
                <div className='text-gray-400 flex items-center' onClick={handleClick}>
                    <SettingsIcon sx={{height: 30, width: 30}}/>
                </div>
            </div>
            <MemoryModeSettings memoryModeStore={memoryModeStore} isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
        </>

    )
})