import { observer } from "mobx-react-lite"
import { SvgIcon } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PieChart, Pie, Cell } from 'recharts';
import { CardsModeStore } from "features/modes/cards-mode"
import { NextStep } from "shared/ui/buttons";
import { useBodyOverflow } from "shared/ui/lib/useBodyOverflow/useBodyOverflow";

import { useSpring, animated } from "@react-spring/web";

interface IProps {
    countOfKnown: number,
    countOfUnknown: number,
    cardsModeStore: CardsModeStore
}

const Result = observer(( { countOfKnown, countOfUnknown, cardsModeStore }: IProps ) => {

    useBodyOverflow()

    const springs = useSpring({
        from: { opacity: 1, display: 'flex', transform: 'rotate(0deg) scale(1)' },
        to: [{ transform: 'rotate(30deg) scale(1.2)' },
             { transform: 'rotate(-30deg) scale(1.4)' },
             { transform: 'rotate(360deg) scale(1)' },
             { opacity: 0 },
             { display: 'none' } ],
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
                <div className='flex gap-8 items-center  mb-8 relative '>
                    <div className='flex-auto text-lg font-bold text-slate-700 bg-r'>Поздравляем! Вы повторили все карточки.</div>
                    <div className='flex justify-center'>
                        <img className='w-32 [transform:scale(-1,1)] object-fill' src='/static/confetti.png'></img>
                    </div>
                </div>
                <div className='grid grid-cols-2 [grid-template-rows: 1fr 1fr 1fr 1fr] gap-y-4 mb-4 gap-x-4'>
                    <div className='text-lg font-semibold text-slate-600'>Ваши результаты</div>
                    <div></div>
                    <div className='flex gap-2 col-span-2 mb-4'>
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
                        <div className='grid grid-cols-[1fr_auto] grid-rows-2 gap-4 p-2'>
                            <div className='text-green-500 font-bold text-base  flex items-center '>
                                {cardsModeStore.cardsSorted ? 'Знаю' : 'Пройдено'}
                            </div>
                            <div className='flex items-center justify-center flex-auto'>
                                <div className='text-green-600 bg-green-100 border-green-300 flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-lg'>
                                    {countOfKnown}
                                </div>
                            </div>
                            {cardsModeStore.cardsSorted ?
                            <div className='text-orange-500 font-bold text-base  flex items-center'>
                                Еще изучаю
                            </div> :
                            <div className='text-slate-500 font-bold text-base  flex items-center '>
                                Осталось терминов
                            </div>}
                            <div className='flex items-center justify-center flex-auto'>
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
                    <div className='text-lg font-semibold text-slate-600'>Следующие шаги</div>
                    <div></div>
                    <>
                        <NextStep
                                headText='Пройдите карточки заново'
                                descriptionText='Изучите эти термины заново с начала'
                                handleClick={cardsModeStore.restart}
                                icon={<ViewCarouselIcon />}
                            />
                    </>
                    <>
                        <NextStep
                            headText='Выучите эти термины'
                            descriptionText='Ответьте на вопросы по этим терминам'
                            handleClick={() => {}}
                            icon={<RepeatIcon />}
                        />
                    </>
                </div>
                <div className="absolute left-4 bottom-4 flex items-end flex-auto">
                    <div className='flex  gap-2 items-center hover:cursor-pointer'>
                        <div>
                            <SvgIcon className='text-slate-600'>
                                <ArrowBackIcon/>
                            </SvgIcon>
                        </div>
                        <div className='text-slate-600 font-semibold' onClick={cardsModeStore.goPrevFromResult}>
                            Вернуться к последнему вопросу
                        </div>
                    </div>
                </div>

                <animated.div className="w-full h-full overflow-hidden absolute top-0 left-0 select-none pointer-events-none" style={{ display: springs.display }}>
                    <animated.div style={springs} className='top-0 left-0 h-full w-full flex items-center justify-center relative'>
                        <img src='/static/cards-mode-congrats.gif' className='w-36 h-56 object-cover rounded-xl drop-shadow-xl'></img>
                    </animated.div>
                </animated.div>
        </>
    )
})

export { Result }