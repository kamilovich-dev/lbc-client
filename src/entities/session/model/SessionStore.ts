import { makeObservable, observable, action } from "mobx";
import { ISessionStore, TUser } from './types';
import type { NavigateFunction } from 'react-router-dom';

class SessionStore implements ISessionStore {

    user: TUser = {
        token: null,
    }

    constructor() {
        makeObservable(this, {
            user: observable,
            login: action,
            logout: action,
        })
        this.initUser();
    }

    initUser = () => {
        const token = sessionStorage.getItem('token')
        if (token) this.user.token = token
    }

    login = async (navigate: NavigateFunction) => {
        new Promise<string>((resolve) => {
            setTimeout(() => resolve('2342f2f1d131rf12'), 250)})
        .then( token => {
            sessionStorage.setItem('token', token)
            this.user.token = token
            navigate('/')
        } );
    }

    logout = (navigate: NavigateFunction) => {
        sessionStorage.removeItem('token')
        this.user.token = null
        navigate('/auth')
    }
}

export { SessionStore }