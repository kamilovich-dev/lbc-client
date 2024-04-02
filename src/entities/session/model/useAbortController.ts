import { useEffect } from "react";
import { CardStore, ModuleStore } from "entities/module";
import { FolderStore } from "entities/folder";
import { GlobalSearchStore } from "entities/global-search";

interface IProps {
    storesWithClient: Array<CardStore | ModuleStore | FolderStore | GlobalSearchStore | undefined>
}

/*Call abortRequest when component unmount*/
export const useAbortController = ( storesWithClient: IProps['storesWithClient']  ) => {
    useEffect(() => {
        return () => storesWithClient.forEach( store => store?.client.abortRequest())
    }, [])
}
