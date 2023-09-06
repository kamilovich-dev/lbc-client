import SvgIcon from '@mui/material/SvgIcon'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


interface IProps {
    handleClick: () => void,
    isAccept: boolean,
    externalRef?: React.RefObject<any>,
}

const SortedNavigation = ( { handleClick, isAccept, externalRef } : IProps) => {
    return (
        <>
            <button className='w-12 h-12 p-2 rounded-full border-[1px] border-gray-300 bg-white hover:bg-slate-200 active:bg-slate-300 flex justify-center items-center' onClick={handleClick} ref={externalRef}>
                <SvgIcon className='text-slate-600' sx={{ height: '100%', width: '100%'}}>
                    {isAccept ? <CheckIcon className='text-green-700'/> : <CloseIcon className='text-red-600'/>}
                </SvgIcon>
            </button>
        </>
    )
}

export { SortedNavigation }

