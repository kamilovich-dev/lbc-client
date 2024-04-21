import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"

import { ListModules } from "pages/modules/ui/ListModules"
import { ListFolders } from "pages/folders/ui/ListFolders"

import { CircularLoader } from "shared/ui/loaders/CircularLoader";
import { GlobalSearchTabs } from "./ui/GlobalSearchTabs"

import { GlobalSearchStore } from "entities/global-search"
import { useAbortController } from "entities/session"
import { GlobalListHeader } from "./ui/GlobalListHeader"

export const GlobalSearchPage = () => {

    useEffect(() => {
        const globalSearchStore = new GlobalSearchStore()
        globalSearchStore.search()
        .then(() => {
            setGlobalSearchStore(globalSearchStore)
        })
    }, [])

    const [globalSearchStore, setGlobalSearchStore] = useState<GlobalSearchStore | undefined>(undefined)
    useAbortController([globalSearchStore])

    if (!globalSearchStore) return <CircularLoader/>

    return <ObservedGlobalSearchPage globalSearchStore={globalSearchStore} />
}

interface IProps {
    globalSearchStore: GlobalSearchStore,
}

const ObservedGlobalSearchPage = observer(( {globalSearchStore}: IProps ) => {

    return (
        <>
            <div>
                <GlobalListHeader globalSearchStore={globalSearchStore}/>
            </div>
            <div className="px-2 mb-2 pt-16">
                <GlobalSearchTabs  globalSearchStore={globalSearchStore}/>
            </div>
            <div className="p-2 pb-10">
                { globalSearchStore.client.isLoading ? <CircularLoader/>
                :
                <>
                    {globalSearchStore.filters.by_type === 'modules' ?
                    <div>
                        <ListModules
                            isHidePublicIcon={true}
                            modules={globalSearchStore.searchResult.modules}
                            view={globalSearchStore.view}
                            />
                    </div> : null}

                    {globalSearchStore.filters.by_type === 'folders' ?
                    <div>
                        <ListFolders
                            isHidePublicIcon={true}
                            folders={globalSearchStore.searchResult.folders}
                            view={globalSearchStore.view}/>
                    </div> : null}

                    {globalSearchStore.filters.by_type === 'all' ?
                        <>
                            {
                                globalSearchStore.searchResult.modules.length > 0 ? <>
                                    <div className="text-center text-gray-600 font-semibold">Модули</div>
                                    <div className="border-b-[1px] border-gray-200 mb-2">
                                        <ListModules
                                            isHidePublicIcon={true}
                                            modules={globalSearchStore.searchResult.modules}
                                            view={globalSearchStore.view}
                                            />
                                    </div >
                                </> : null
                            }

                            {
                                globalSearchStore.searchResult.folders.length > 0 ? <>
                                    <div className="text-center text-gray-600 font-semibold">Папки</div>
                                    <div>
                                        <ListFolders
                                            isHidePublicIcon={true}
                                            folders={globalSearchStore.searchResult.folders}
                                            view={globalSearchStore.view}/>
                                    </div>
                                </> : null
                            }
                        </> : null
                    }
                </>}
            </div>

        </>
    )
})