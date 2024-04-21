import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SettingsIcon from '@mui/icons-material/Settings';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { SelectionModeStore } from 'features/modes/selection-mode/model/SelectionModeStore';
import { observer } from "mobx-react-lite"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectionModeSettings } from "./SelectionModeSettings";

interface IProps {
    selectionModeStore: SelectionModeStore,
}

export const SelectionModeHeader = observer(( { selectionModeStore }: IProps ) => {

    const navigate = useNavigate()
    const [isShowModal, setIsShowModal] = useState(false)

    const handleClick = () => {
        setIsShowModal(true)
    }

    return (
        <>
            <div className="h-[50px] p-2 bg-white flex items-center gap-4">
                <div className='text-gray-400 flex items-center' onClick={() => navigate(-1)}>
                    <CloseIcon sx={{height: 30, width: 30}}/>
                </div>
                <div className='text-xl text-gray-400 flex-auto flex'>
                    { selectionModeStore.timerValue }
                </div>
                <div className='text-gray-400 flex items-center' onClick={selectionModeStore.start}>
                    <RestartAltIcon sx={{height: 30, width: 30}}/>
                </div>
                <div className='text-gray-400 flex items-center' onClick={selectionModeStore.switchMusicOn}>
                    {selectionModeStore.isMusicOn ?
                    <VolumeUpIcon sx={{height: 30, width: 30}}/>
                    : <VolumeOffIcon sx={{height: 30, width: 30}}/>}
                </div>
                <div className='text-gray-400 flex items-center' onClick={handleClick}>
                    <SettingsIcon sx={{height: 30, width: 30}}/>
                </div>
            </div>
            <SelectionModeSettings selectionModeStore={selectionModeStore} isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
        </>

    )
})