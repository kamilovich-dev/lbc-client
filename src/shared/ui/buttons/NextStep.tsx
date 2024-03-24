import { SvgIcon } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface IProps {
    headText: string,
    descriptionText: string,
    handleClick: () => void,
    icon: JSX.Element
}

const NextStep = ( { headText, descriptionText, handleClick, icon }: IProps ) => {

    return (
        <>
            <div className='gap-1 flex flex-col bg-white rounded-lg shadow-md px-1 py-2 hover:cursor-pointer hover:ring-2 hover:ring-gray-300'
                onClick={handleClick}>
                <div className='text-blue-600 font-semibold text-xs text-center mb-2 flex-auto'>{headText}</div>
                <div className='flex gap-2'>
                    <div className='flex items-center justify-center'>
                        <SvgIcon className='text-blue-600' sx={{width: '30px', height: '30px'}}>
                            {icon}
                        </SvgIcon>
                    </div>
                    <div className='text-xs leading-5 text-slate-600 flex-auto text-balance'>{descriptionText}</div>
                    <div className='flex items-center justify-end '>
                        <SvgIcon className='text-slate-500' sx={{height: '15px', width: '15px'}}>
                            <ArrowForwardIosIcon/>
                        </SvgIcon>
                    </div>
                </div>
            </div>
        </>
    )
}

export { NextStep }