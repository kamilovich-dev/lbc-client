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
            <div className='flex gap-2 bg-white rounded-lg shadow-md px-1 py-4 hover:cursor-pointer hover:ring-2 hover:ring-gray-300'
                onClick={handleClick}>
                <div className='w-3/12 flex items-center justify-center'>
                    <SvgIcon className='text-blue-600' sx={{width: '80px', height: '80px'}}>
                        {icon}
                    </SvgIcon>
                </div>
                <div className='flex flex-col gap2 w-8/12'>
                    <div className='text-blue-600 font-semibold text-lg flex-auto '>{headText}</div>
                    <div className='text-md flex-auto leading-5 text-slate-600'>{descriptionText}</div>
                </div>
                <div className='w-1/12 flex items-center justify-end pr-2'>
                    <SvgIcon className='text-slate-500' sx={{height: '15px', width: '15px'}}>
                        <ArrowForwardIosIcon/>
                    </SvgIcon>
                </div>
            </div>
        </>
    )
}

export { NextStep }