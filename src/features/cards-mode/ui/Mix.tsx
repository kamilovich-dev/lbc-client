import ShuffleIcon from '@mui/icons-material/Shuffle';
import SvgIcon from '@mui/material/SvgIcon';

interface IProps {
    handleClick: () => void,
    isMixed: boolean,
}

const Mix = ( {handleClick, isMixed}: IProps ) => {

    return (
        <>
            <button onClick={handleClick} className={ (isMixed ? 'bg-white border-gray-300 border-[1px] ' : '') + 'w-14 h-14 p-2 rounded-full  active:bg-slate-300 flex justify-center items-center'}>
                <SvgIcon className='text-slate-600' sx={{width: '100%', height: '100%'}}>
                    <ShuffleIcon/>
                </SvgIcon>
            </button>
        </>
    )
}

export { Mix }