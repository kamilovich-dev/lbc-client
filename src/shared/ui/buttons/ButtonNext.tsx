import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SvgIcon from '@mui/material/SvgIcon'

interface IProps {
    handleClick: () => void,
    externalRef?: React.RefObject<any>,
}

const ButtonNext = ( { handleClick, externalRef } : IProps) => {
    return (
        <>
            <button className='w-12 h-12 p-2 rounded-full border-[1px] border-gray-300 bg-white hover:bg-slate-200 active:bg-slate-300 flex justify-center items-center' onClick={handleClick} ref={externalRef}>
                <SvgIcon className='text-slate-600' sx={{ height: '100%', width: '100%'}}>
                    <ArrowForwardIcon/>
                </SvgIcon>
            </button>
        </>
    )
}

export { ButtonNext }