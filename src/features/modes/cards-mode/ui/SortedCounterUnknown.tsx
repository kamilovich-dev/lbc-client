import { observer } from "mobx-react-lite"

interface IProps {
    count: number
    unknownText: string
}

const SortedCounterUnknown = observer(( { count, unknownText } : IProps) => {

    const counterCn = unknownText ? 'text-white bg-orange-500 border-orange-500' : 'text-orange-600 bg-orange-100  border-orange-300'
    const text = unknownText || count

    return (
        <>
            <div className='flex items-center'>
                <div className='flex gap-2 items-center'>
                    <div className={`${counterCn}  flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-md`}>
                        {text}
                    </div>
                    <div className={`text-orange-600 font-bold text-md flex items-center justify-center`}>
                        Еще изучаю
                    </div>
                </div>
            </div>
        </>
    )
})

export { SortedCounterUnknown }

