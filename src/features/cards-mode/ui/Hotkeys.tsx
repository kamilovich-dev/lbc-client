import { useSpring, animated } from "@react-spring/web"
import { useState } from "react"
import { SvgIcon } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Hotkeys = () => {

    const [isShown, setIsShown] = useState(false)
    const springs = useSpring({
        opacity: isShown ? 1 : 0,
        height: isShown ? '180px' : '0px'
    })

    return (
        <>
            <div className="flex gap-2 items-center py-4">
                <div className='w-full'>
                    <h2 className='text-slate-700 font-semibold text-lg'>Сочетания клавиш</h2>
                </div>
                <div onClick={() => setIsShown(!isShown)} className="hover:cursor-pointer hover:text-blue-700 text-blue-400 text-lg font-semibold">
                    { isShown ?
                     <div className="flex items-center">
                        Скрыть
                        <SvgIcon>
                            <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                        </SvgIcon>
                    </div> :
                    <div className="flex items-center">
                        Просмотреть
                        <SvgIcon>
                            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                        </SvgIcon>
                    </div>  }
                </div>
            </div>
            <animated.div style={springs} className='grid grid-cols-2 grid-rows-4 w-full'>
                <div className='flex  border-b-[1px] border-gray-100 p-2'>
                    <div className='flex-grow text-gray-500'>
                        Назад
                    </div>
                    <div className="border-gray-400 border-2 text-gray-400 w-7 flex justify-center rounded-md">
                        ←
                    </div>
                </div>
                <div className='flex border-b-[1px] border-gray-100 p-2'>
                    <div className='flex-grow text-gray-500'>
                        Пометить ★
                    </div>
                    <div className="border-gray-400 border-2 text-gray-400 w-7 flex justify-center rounded-md">
                        s
                    </div>
                </div>
                <div className='flex border-b-[1px] border-gray-100 p-2'>
                    <div className='flex-grow text-gray-500'>
                        Далее
                    </div>
                    <div className="border-gray-400 border-2 text-gray-400 w-7 flex justify-center rounded-md">
                        →
                    </div>
                </div>
                <div className='flex  border-b-[1px] border-gray-100 p-2'>
                    <div className='flex-grow text-gray-500'>
                        Перевернуть
                    </div>
                    <div className="border-gray-400 border-2 text-gray-400 w-20 flex justify-center rounded-md">
                        Пробел
                    </div>
                </div>
                <div className='flex p-2 border-b-[1px] border-gray-100'>
                    <div className='flex-grow text-gray-500 '>
                        Еще изучаю
                    </div>
                    <div className="border-gray-400 border-2 text-gray-400 w-7 flex justify-center rounded-md">
                        ↓
                    </div>
                </div>
                <div>
                </div>
                <div className='flex p-2'>
                    <div className='flex-grow text-gray-500'>
                        Знаю
                    </div>
                    <div className="border-gray-400 border-2 text-gray-400 w-7 flex justify-center rounded-md">
                        ↑
                    </div>
                </div>
            </animated.div>
        </>
    )

}

export { Hotkeys }