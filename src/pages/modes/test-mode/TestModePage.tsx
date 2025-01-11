import { TestModeStore } from "features/modes/test-mode"
import { useParams } from "react-router-dom"
import { CircularLoader } from "shared/ui/loaders/CircularLoader";
import { useInitTestMode } from "./model/useInitTestMode";
import { observer } from 'mobx-react-lite'

const TestModePage = () => {
    const routeParams = useParams()

    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : null
    if (!moduleId) return console.log('TestModePage: moduleId не задан')

    const testModeStore = useInitTestMode(moduleId)
    if (!testModeStore) return <CircularLoader/>

    return <ObservedTestModePage testModeStore={testModeStore}/>
}

interface IProps {
    testModeStore: TestModeStore,
}

const ObservedTestModePage = observer(( {testModeStore} : IProps ) => {
    return <>
        <div className="pl-4">

        </div>
    </>
})


export { TestModePage }