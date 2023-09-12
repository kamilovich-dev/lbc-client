import { observer } from "mobx-react-lite"
import { SvgIcon } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PieChart, Pie, Cell } from 'recharts';
import { CardsModeStore } from "features/cards-mode"
import { NextStep } from "shared/ui/buttons";

import { useSpring, animated } from "@react-spring/web";

interface IProps {
    countOfKnown: number,
    countOfUnknown: number,
    cardsModeStore: CardsModeStore
}

const Result = observer(( { countOfKnown, countOfUnknown, cardsModeStore }: IProps ) => {

    const springs = useSpring({
        from: { opacity: 0.8 },
        to: { opacity: 0 },
        config: { duration: 500 }
    })

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

    const colors = ['#59E8B5', '#FF8042']

    return (
        <>
                <div className='flex gap-2 items-center py-4 mb-8 relative'>
                    <div className='w-3/4 text-3xl font-bold text-slate-700'>Поздравляем! Вы повторили все карточки.</div>
                    <div className='w-1/4 flex justify-center'>
                        <img className='h-28 [transform:scale(-1,1)] object-cover' src='/static/Confetti.png'></img>
                    </div>
                    <animated.div style={springs} className='absolute top-0 left-0 h-[100vh] w-full'>
                        <img src='/static/confetti_3.gif' className='w-full h-full object-cover'></img>
                    </animated.div>
                </div>
                <div className='grid grid-cols-2 [grid-template-rows: 1fr 1fr 1fr] gap-y-4 mb-10 gap-x-4'>
                    <div className='text-xl font-semibold text-slate-600'>Ваши результаты</div>
                    <div className='text-xl font-semibold text-slate-600'>Следующие шаги</div>
                    <div className='flex gap-2'>
                        <div className='flex items-center justify-start p-2 relative'>
                            <PieChart width={100} height={100}>
                                <Pie
                                    innerRadius={36}
                                    outerRadius={50}
                                    paddingAngle={0}
                                    data={data}
                                    dataKey="value">
                                        {data.map((entry, index) => (
                                            <Cell key={index} fill={colors[index]}/>
                                        ))}

                                </Pie>
                            </PieChart>
                            <div className='absolute text-gray-400 font-semibold left-9 text-lg'>{
                                (countOfKnown / (countOfKnown + countOfUnknown) * 100).toFixed(0)
                            } %</div>
                        </div>
                        <div className='grid grid-cols-3'>
                            <div className='flex flex-col gap-2 p-2 col-span-2'>
                                <div className='text-green-500 font-bold text-xl flex-auto flex items-center'>
                                    {cardsModeStore.cardsSorted ? 'Знаю' : 'Пройдено'}
                                </div>
                                {cardsModeStore.cardsSorted ?
                                    <div className='text-orange-500 font-bold text-xl flex-auto flex items-center'>
                                        Еще изучаю
                                    </div> :
                                    <div className='text-slate-500 font-bold text-xl flex-auto flex items-center '>
                                        Осталось терминов
                                    </div>}
                            </div>
                            <div className='flex flex-col gap-2 p-2'>
                                <div className='flex items-center justify-center flex-auto'>
                                    <div className='text-green-600 bg-green-100 border-green-300 flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-lg'>
                                        {countOfKnown}
                                    </div>
                                </div>
                                <div className='flex items-center justify-center flex-auto '>
                                    {cardsModeStore.cardsSorted ?
                                        <div className='text-orange-600 bg-orange-100 border-orange-300 flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-lg'>
                                            {countOfUnknown}
                                        </div> :
                                        <div className='text-gray-600 bg-gray-100 border-gray-300 flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-lg'>
                                            {countOfUnknown}
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <>
                        <NextStep
                            headText='Выучите эти термины'
                            descriptionText='Ответьте на вопросы по этим терминам'
                            handleClick={() => {}}
                            icon={<RepeatIcon />}
                        />
                    </>
                    <div></div>
                    <>
                        <NextStep
                                headText='Пройдите карточки заново'
                                descriptionText='Изучите эти термины заново с начала'
                                handleClick={cardsModeStore.restart}
                                icon={<ViewCarouselIcon />}
                            />
                    </>
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