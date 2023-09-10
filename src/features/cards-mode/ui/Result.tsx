import { observer } from "mobx-react-lite"
import { SvgIcon } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PieChart, Pie, Cell } from 'recharts';
import { CardsModeStore } from "features/cards-mode"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IProps {
    countOfKnown: number,
    countOfUnknown: number,
    cardsModeStore: CardsModeStore
}

const Result = observer(( { countOfKnown, countOfUnknown, cardsModeStore }: IProps ) => {

    const data = [
        {
            name: 'countOfKnown',
            value: countOfKnown
        },
        {
            name: 'countOfUnknown',
            value: countOfUnknown
        }
    ]

    const colors = ['#00C49F', '#FF8042']

    return (
        <>
                <div className='flex gap-2 items-center py-4 mb-8'>
                    <div className='w-3/4 text-3xl font-bold text-slate-700'>Поздравляем! Вы повторили все карточки.</div>
                    <div className='w-1/4 flex justify-center'>
                        <img className='h-28 [transform:scale(-1,1)] object-cover' src='/static/Confetti.png'></img>
                    </div>
                </div>
                <div className='grid grid-cols-2 [grid-template-rows: 1fr 1fr 1fr] gap-y-4 mb-10'>
                    <div className='text-xl font-semibold h-[50px] text-slate-600'>Ваши результаты</div>
                    <div className='text-xl font-semibold h-[50px] text-slate-600'>Следующие шаги</div>
                    <div className='flex gap-2'>
                        <div className='flex items-center justify-center p-2 w-1/3 relative'>
                            <PieChart width={80} height={80}>
                                <Pie
                                    innerRadius={30}
                                    outerRadius={40}
                                    fill="#FF983A"
                                    paddingAngle={0}
                                    data={data}
                                    dataKey="value">
                                        {data.map((entry, index) => (
                                            <Cell key={index} fill={colors[index]}/>
                                        ))}
                                </Pie>
                            </PieChart>
                            <div className='absolute text-gray-400 font-semibold'>{
                                (countOfKnown / (countOfKnown + countOfUnknown) * 100).toFixed(0)
                            } %</div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className='flex flex-col gap-2 p-2'>
                                <div className='text-green-500 font-bold text-xl flex-auto'>Знаю</div>
                                <div className='text-orange-500 font-bold text-xl flex-auto'>Еще изучаю</div>
                            </div>
                            <div className='flex flex-col gap-2 p-2'>
                                <div className='flex items-center justify-center flex-auto'>
                                    <div className='text-green-600 bg-green-100 border-green-400 flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-md'>
                                        {countOfKnown}
                                    </div>
                                </div>
                                <div className='flex items-center justify-center flex-auto'>
                                    <div className='text-orange-600 bg-orange-100 border-orange-400 flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-md'>
                                        {countOfUnknown}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 bg-white rounded-lg shadow-md px-1 py-3 hover:cursor-pointer hover:ring-2 hover:ring-gray-300'>
                        <div className='w-3/12 flex items-center justify-center'>
                            <SvgIcon className='text-blue-600' sx={{width: '70px', height: '70px'}}>
                                <RepeatIcon />
                            </SvgIcon>
                        </div>
                        <div className='flex flex-col gap2 w-8/12'>
                            <div className='text-blue-600 font-semibold text-lg flex-auto mb-2'>Выучите эти термины</div>
                            <div className='text-md flex-auto'>Ответьте на вопросы по этим терминам</div>
                        </div>
                        <div className='w-1/12 flex items-center justify-end pr-2'>
                            <SvgIcon className='text-slate-500' sx={{height: '15px', width: '15px'}}>
                                <ArrowForwardIosIcon/>
                            </SvgIcon>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div className='flex gap-2 bg-white rounded-lg shadow-md px-1 py-3 hover:cursor-pointer hover:ring-2 hover:ring-gray-300'
                        onClick={cardsModeStore.restart}>
                        <div className='w-3/12 flex items-center justify-center'>
                            <SvgIcon className='text-blue-600' sx={{width: '70px', height: '70px'}}>
                                <ViewCarouselIcon />
                            </SvgIcon>
                        </div>
                        <div className='flex flex-col gap2 w-8/12'>
                            <div className='text-blue-600 font-semibold text-lg flex-auto mb-2'>Пройдите карточки заново</div>
                            <div className='text-md flex-auto'>Изучите эти термины заново с начала</div>
                        </div>
                        <div className='w-1/12 flex items-center justify-end pr-2'>
                            <SvgIcon className='text-slate-500' sx={{height: '15px', width: '15px'}}>
                                <ArrowForwardIosIcon/>
                            </SvgIcon>
                        </div>
                    </div>


                </div>
                <div className='flex gap-2 items-center hover:cursor-pointer'>
                    <div>
                        <SvgIcon className='text-slate-600'>
                            <ArrowBackIcon/>
                        </SvgIcon>
                    </div>
                    <div className='text-slate-600 font-semibold' onClick={cardsModeStore.goPrevFromResult}>
                        Вернуться к последнему вопросу
                    </div>
                </div>
        </>
    )
})

export { Result }