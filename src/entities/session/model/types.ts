import type { NavigateFunction } from 'react-router-dom';

interface ISessionStore {
    user: TUser,
    initUser: () => void,
    login: ( navigate: NavigateFunction ) => Promise<void>,
    logout: ( navigate: NavigateFunction ) => void,
}

type TUser = {
    token: string | null,
}

export type {
    ISessionStore,
    TUser
}