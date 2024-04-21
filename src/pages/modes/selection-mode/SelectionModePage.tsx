import { observer } from "mobx-react-lite"
import { useInitSelectionMode } from "./model/useInitSelectionMode"
import { useParams } from "react-router-dom";
import { CircularLoader } from "shared/ui/loaders/CircularLoader";
import { CardsNotFound } from "shared/ui/info/CardsNotFound";
import { SelectionModeStore } from "features/modes/selection-mode/model/SelectionModeStore";
import { SelectionModeHeader } from "./ui/SelectionModeHeader";
import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

export const SelectionModePage = () => {
    const routeParams = useParams();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : undefined

    const { isLoading, selectionModeStore } = useInitSelectionMode( { moduleId } )
    if (isLoading) return <CircularLoader/>
    if (!selectionModeStore) return
    if (selectionModeStore.cards.length === 0) return <CardsNotFound/>

    return <ObservedSelectionModePage selectionModeStore={selectionModeStore}/>
}

interface IProps {
    selectionModeStore: SelectionModeStore
}

const ObservedSelectionModePage = observer(( {selectionModeStore}: IProps  ) => {

    useEffect(() => {
        selectionModeStore.start()
        return () => selectionModeStore.finish()
    }, [])


    return (
        <>
            <SelectionModeHeader selectionModeStore={selectionModeStore}/>
            <div className="p-2 grid grid-cols-3 gap-2 pb-14">
                {selectionModeStore.isFinished ?
                    <div className="bg-green-500 text-white rounded-lg w-full flex items-cente justify-center col-span-3 p-2">
                        Все карточки пройдены
                    </div>:
                    selectionModeStore.mixedCards.map((card, idx) =>
                        <animated.div key={idx} style={selectionModeStore.selectionModeAnimation?.controllers[idx].springs}
                            onClick={() => selectionModeStore.handleClick(idx)}
                            className={`h-[120px] bg-white rounded-lg shadow-md p-2 flex items-center justify-center text-center`}>
                            {card.value}
                        </animated.div>
                    )
                }
            </div>
        </>
    )
})