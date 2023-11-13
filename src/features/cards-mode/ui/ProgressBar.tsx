import { observer } from "mobx-react-lite"

interface IProps {
    current: number,
    max: number,
    resultShown: boolean
}

const ProgressBar = observer(( {current, max, resultShown}: IProps ) => {

    let widthPercent = (( current / max ) * 100).toFixed(0)
    if (resultShown) widthPercent = '100'
    const cn = `h-1 bg-blue-400 w-[${widthPercent}%]`

    return (
        <>
                <div className={cn}></div>
        </>
    )
})

export { ProgressBar }
