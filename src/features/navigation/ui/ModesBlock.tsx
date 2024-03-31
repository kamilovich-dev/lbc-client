import { SvgIcon} from '@mui/material'
import { useNavigate, useParams, generatePath } from 'react-router-dom'

import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import RepeatIcon from '@mui/icons-material/Repeat';
import QuizIcon from '@mui/icons-material/Quiz';
import FactCheckIcon from '@mui/icons-material/FactCheck';

import { routePaths } from 'shared/config';

const ModesBlock = ( ) => {

    const navigate = useNavigate()
    const params = useParams()


    const navigations = [
        {
            icon: <ViewCarouselIcon />,
            text: 'Карточки',
            handleClick: () => navigate(generatePath(routePaths.CARDS_MODE, { moduleId: params.moduleId ?? '' }))
        },
        {
            icon: <RepeatIcon />,
            text: 'Заучивание',
            handleClick: () => navigate(generatePath(routePaths.CARDS_MODE, { moduleId: params.moduleId ?? '' }))
        },
        {
            icon: <QuizIcon />,
            text: 'Тест',
            handleClick: () => navigate(generatePath(routePaths.CARDS_MODE, { moduleId: params.moduleId ?? '' }))
        },
        {
            icon: <FactCheckIcon />,
            text: 'Подбор',
            handleClick: () => navigate(generatePath(routePaths.CARDS_MODE, { moduleId: params.moduleId ?? '' }))
        }
    ]

    return (
        navigations.map( (navigation, idx) => (
            <div key={idx} className='relative group bg-white rounded-lg  flex items-center p-3 shadow-md hover:cursor-pointer overflow-hidden' onClick={navigation.handleClick}>
                <div className='opacity-0 absolute left-0 bottom-0 group-hover:opacity-100 h-1 w-full bg-indigo-300'></div>
                <div className='mr-2'>
                    <SvgIcon className='text-blue-600'>
                        {navigation.icon}
                    </SvgIcon>
                </div>
                <div className='font-semibold text-base'>
                    {navigation.text}
                </div>
            </div>
        ))
    )
}

export { ModesBlock }