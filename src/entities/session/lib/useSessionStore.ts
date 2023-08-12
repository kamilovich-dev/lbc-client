import { useContext } from 'react'
import { SessionStoreContext } from "../contexts/SessionStoreContext";

const useSessionStore = () => {
    return useContext(SessionStoreContext)
}

export {useSessionStore}