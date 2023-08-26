import type { NavigateFunction } from 'react-router-dom';
import { IClient } from 'shared/api/lbc-server';

interface ISessionStore {
    session: TSession,
    client: IClient,
    initSession: () => void,
    register: ( navigate: NavigateFunction, email: string, password: string ) => Promise<void>,
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