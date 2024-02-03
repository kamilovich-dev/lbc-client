import { useEffect } from "react";
import { CardStore, ModuleStore } from "..";

interface IProps {
    storesWithClient: Array<CardStore | ModuleStore>
}

/*Call abortRequest when component unmount*/
export const useAbortController = ( storesWithClient: IProps['storesWithClient']  ) => {
    useEffect(() => {
        return () => storesWithClient.forEach( store => store.client.abortRequest())
    }, [])
}
