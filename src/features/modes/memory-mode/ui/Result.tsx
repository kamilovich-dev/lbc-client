import { observer } from "mobx-react-lite"
import { PieChart, Pie, Cell } from 'recharts';
import { NextStep } from "shared/ui/buttons";
import { MemoryModeStore } from "../model/MemoryModeStore";
import RepeatIcon from '@mui/icons-material/Repeat';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { routePaths } from 'shared/config';
import { useNavigate, useParams, generatePath } from 'react-router-dom'

interface IProps {
    memoryModeStoe: MemoryModeStore
}

const Result = observer(( { memoryModeStoe }: IProps ) => {

    const countOfKnown = memoryModeStoe.result.knownCount
    const countOfUnknown = memoryModeStoe.result.unknownCount

    const navigate = useNavigate()
    const params = useParams()

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
            <div className="p-2">
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
                                Верно
                            </div>
                            <div className='flex items-center justify-center flex-auto'>
                                <div className='text-green-600 bg-green-100 border-green-300 flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-lg'>
                                    {countOfKnown}
                                </div>
                            </div>
                            <div className='text-orange-500 font-bold text-base  flex items-center'>
                                Неверно
                            </div>
                            <div className='flex items-center justify-center flex-auto'>
                                    <div className='text-orange-600 bg-orange-100 border-orange-300 flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-lg'>
                                        {countOfUnknown}
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-lg font-semibold text-slate-600'>Следующие шаги</div>
                    <div></div>
                    <>
                        <NextStep
                                headText='Выучите карточки заново'
                                descriptionText='Изучите эти термины заново с начала'
                                handleClick={memoryModeStoe.start}
                                icon={<RepeatIcon />}
                            />
                    </>
                    <>
                        <NextStep
                            headText='Попробуйте подбор'
                            descriptionText='Подберите соответствия'
                            handleClick={() => navigate(generatePath(routePaths.SELECTION_MODE, { moduleId: params.moduleId ?? '' }))}
                            icon={<FactCheckIcon />}
                        />
                    </>
                </div>
            </div>
        </>
    )
})

export { Result }