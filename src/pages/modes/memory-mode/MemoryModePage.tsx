import { observer } from "mobx-react-lite"
import { MemoryModeHeader } from "./ui/MemoryModeHeader"
import { useInitMemoryMode } from "./model/useInitMemoryMode";
import { useParams } from "react-router-dom";
import { CircularLoader } from "shared/ui/loaders/CircularLoader";
import { CardsNotFound } from "shared/ui/info/CardsNotFound";
import { MemoryModeStore } from "features/modes/memory-mode";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Result } from 'features/modes/memory-mode'


export const MemoryModePage = () => {
    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : undefined

    const { isLoading, memoryModeStore } = useInitMemoryMode( { moduleId } )
    if (isLoading) return <CircularLoader/>
    if (!memoryModeStore) return
    if (memoryModeStore.cards.length === 0) return <CardsNotFound/>

    return <ObservedMemoryModePage memoryModeStore={memoryModeStore}/>
}

interface IProps {
    memoryModeStore: MemoryModeStore
}

const ObservedMemoryModePage = observer(( { memoryModeStore }: IProps ) => {

    const currentIdx = memoryModeStore.result.currentCardIndex
    const memoryCard = memoryModeStore.memoryCards[currentIdx]
    const result = memoryModeStore.result

    return <>
        <MemoryModeHeader memoryModeStore={memoryModeStore}/>
            {memoryModeStore.result.isShowFinalResult ?
            <Result memoryModeStoe={memoryModeStore}/> :
            <div className="p-2 pb-[52px] flex flex-auto">
            <div className="p-2 bg-white rounded-md flex-auto flex flex-col gap-2">
                <div className="flex gap-2 mb-10 flex-auto">
                    <div className="w-1/2 text-gray-500 text-xl ">
                        {memoryCard.question}
                    </div>
                    <div className="w-1/2 p-2 flex justify-end ">
                        {memoryCard.imgUrl === '' ? null :
                        <img src={memoryCard.imgUrl} className="w-5/6 h-fit bg-cover rounded-xl"/>}
                    </div>
                </div>
                {result.isShowCurrentResult ?
                    result.isCurrentResultSuccess ? <div className="font-semibold text-lg text-green-500">Замечательно</div>:
                    <div className="font-semibold text-lg text-red-600">Неверно</div>
                : <div className="font-semibold text-lg text-gray-400">Выберите ответ</div>}

                {result.isShowCurrentResult ?
                    result.isCurrentResultSuccess ?
                        <>
                            {memoryCard.variants.map( (variant, idx) =>
                            <div key={variant.id} className={` border-[1px] rounded-md flex gap-2 p-2
                                ${memoryCard.id === variant.id ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}
                                onClick={memoryModeStore.acceptAnswer}>

                                {memoryCard.id === variant.id ?
                                    <div className=" rounded-full w-[25px] flex justify-center text-gray-500 items-center">
                                        <CheckIcon sx={{width: 20, height: 20, color: 'green'}}/>
                                    </div>
                                 : <div className="bg-gray-300 rounded-full w-[25px] flex justify-center text-gray-500 items-center">
                                 {idx + 1}
                                 </div>}
                                <div className="text-gray-500">
                                    {variant.value}
                                </div>
                            </div>
                            )}
                            <div className="flex justify-end p-2">
                                <button onClick={memoryModeStore.acceptAnswer} className="bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600">Продолжить</button>
                            </div>
                        </>
                         :
                        <>
                            <div className="text-gray-500">Ваш ответ</div>
                            <div onClick={memoryModeStore.acceptAnswer} className="mb-10 border-[1px] rounded-md flex gap-2 p-2 items-center border-red-600 bg-red-50 text-gray-500">
                                <CloseIcon sx={{width: 20, height: 20, color: 'red'}}/>
                                {result.selectedVariant}
                            </div>
                            <div className="text-gray-500">Правильный ответ</div>
                            <div onClick={memoryModeStore.acceptAnswer} className="border-[1px] rounded-md flex gap-2 p-2 text-gray-500">
                                <div className="w-[25px] h-[25px] rounded-full bg-gray-300 flex justify-center">{memoryCard.variants.findIndex(variant => variant.id === memoryCard.id) + 1}</div>
                                {memoryCard.variants.find(item => item.id === memoryCard.id)?.value ?? ''}
                            </div>

                            <div className="flex justify-end p-2">
                                <button onClick={memoryModeStore.acceptAnswer} className="bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600">Продолжить</button>
                            </div>
                        </>
                    :
                    <>
                        {memoryCard.variants.map( (variant, idx) =>
                            <div key={variant.id} className="border-gray-300 border-[1px] rounded-md flex gap-2 p-2" onClick={() => memoryModeStore.selectAnswer(variant.id)}>
                                <div className="bg-gray-300 rounded-full w-[25px] flex justify-center text-gray-500">
                                    {idx + 1}
                                </div>
                                <div className="text-gray-500">
                                    {variant.value}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end p-2">
                            <button onClick={memoryModeStore.acceptAnswer} className="bg-blue-400 opacity-0 -z-50 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600">Продолжить</button>
                        </div>
                    </>
                    }
            </div>
            </div>
             }
    </>
})