import type { NavigateFunction } from 'react-router-dom';

interface ISessionStore {
    session: TSession,
    initSession: () => void,
    register: ( navigate: NavigateFunction, email: string, password: string ) => Promise<boolean>,
    login: ( navigate: NavigateFunction, email: string, password: string ) => Promise<void>,
    logout: ( navigate: NavigateFunction ) => void,
}

type TSession = {
    token: string | null,
}

export type {
    ISessionStore,
    TSession
}