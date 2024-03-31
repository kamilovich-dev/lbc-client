import { useEffect } from "react";
import { CardStore, ModuleStore } from "entities/module";
import { FolderStore } from "entities/folder";

interface IProps {
    storesWithClient: Array<CardStore | ModuleStore | FolderStore>
}

/*Call abortRequest when component unmount*/
export const useAbortController = ( storesWithClient: IProps['storesWithClient']  ) => {
    useEffect(() => {
        return () => storesWithClient.forEach( store => store.client.abortRequest())
    }, [])
}
