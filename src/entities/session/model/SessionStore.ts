import { makeObservable, observable, action } from "mobx";
import { ISessionStore, TUser } from './types';
import type { NavigateFunction } from 'react-router-dom';
import { Client } from "shared/api";
import { userEndpoints } from "shared/api";

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

    login = async (navigate: NavigateFunction, email:string, password: string) => {
        await userEndpoints.login(new Client().axiosInstance, { email, password })
            .then( response => {
                if (response?.accessToken) {
                    this.user.token = response.accessToken
                    navigate('/')
                }
            } )
    }

    logout = (navigate: NavigateFunction) => {
        sessionStorage.removeItem('token')
        this.user.token = null
        navigate('/auth')
    }
}

export { SessionStore }