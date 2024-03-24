import SvgIcon from '@mui/material/SvgIcon'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


interface IProps {
    handleClick: () => void,
    isAccept: boolean,
}

const SortedNavigation = ( { handleClick, isAccept } : IProps) => {
    return (
        <>
            <button className='w-16 h-14 p-2 rounded-xl border-[1px] border-gray-300 bg-white hover:bg-slate-200 active:bg-slate-300 flex justify-center items-center' onClick={handleClick}>
                <SvgIcon className='text-slate-600' sx={{ height: '100%', width: '100%'}}>
                    {isAccept ? <CheckIcon className='text-green-700'/> : <CloseIcon className='text-red-600'/>}
                </SvgIcon>
            </button>
        </>
    )
}

export { SortedNavigation }

