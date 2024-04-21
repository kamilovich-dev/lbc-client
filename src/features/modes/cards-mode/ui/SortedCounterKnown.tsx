import { observer } from "mobx-react-lite"

interface IProps {
    count: number
    knownText: string
}

const SortedCounterKnown = observer(( { count, knownText } : IProps) => {

    const counterCn = knownText ? 'text-white bg-green-500 border-green-500' : 'text-green-600 bg-green-100 border-green-400'
    const text = knownText || count

    return (
        <>
            <div className='flex items-center'>
                <div className='flex gap-2 items-center'>
                    <div className={`text-green-600 font-bold text-md flex items-center justify-center`}>
                        Знаю
                    </div>
                    <div className={`${counterCn} flex items-center justify-center w-12 rounded-3xl border-[1px] font-bold text-md`}>
                        {text}
                    </div>
                </div>
            </div>
        </>
    )
})

export { SortedCounterKnown }

