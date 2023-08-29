import { SvgIcon} from '@mui/material'

interface IProps {
    Icon: JSX.Element,
    text: string,
    handleClick: ( args:any ) => void
}

const ToSelectedMode = (  {Icon, text, handleClick}: IProps ) => {
    return (
        <div className='relative group bg-white rounded-lg  flex items-center p-3 shadow-md w-40 hover:cursor-pointer overflow-hidden' onClick={handleClick}>
            <div className='opacity-0 absolute left-0 bottom-0 group-hover:opacity-100 h-1 w-full bg-indigo-300'></div>
            <div className='mr-2'>
                <SvgIcon className='text-blue-600'>
                    {Icon}
                </SvgIcon>
            </div>
            <div className='font-semibold text-base'>
                {text}
            </div>
        </div>
    )
}

export { ToSelectedMode }