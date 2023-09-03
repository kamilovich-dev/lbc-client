import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SvgIcon from '@mui/material/SvgIcon';


interface IProps {
    handleClick: () => void,
    isPlaying: boolean,
}

const Autoplay = ( {handleClick, isPlaying}: IProps ) => {

    return (
        <>
            <button onClick={handleClick} className={ (isPlaying ? 'bg-white border-gray-300 border-[1px] ' : '') + 'w-12 h-12 p-2 rounded-full hover:bg-slate-200 active:bg-slate-300 flex justify-center items-center'}>
                <SvgIcon className='text-slate-600' sx={{width: '100%', height: '100%'}}>
                    { isPlaying ? <StopIcon/> : <PlayArrowIcon/> }
                </SvgIcon>
            </button>
        </>
    )
}

export { Autoplay }