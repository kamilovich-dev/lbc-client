import { makeObservable, observable, action } from "mobx";
import { ISessionStore, TSession } from './types';
import type { NavigateFunction } from 'react-router-dom';
import { Client } from "shared/api";
import { userEndpoints } from "shared/api";

class SessionStore implements ISessionStore {

    session: TSession = {
        token: null,
    }

    constructor() {
        makeObservable(this, {
            session: observable,
            login: action,
            logout: action,
        })
        this.initSession();
    }

    initSession = () => {
        const token = sessionStorage.getItem('token')
        if (token) this.session.token = token
    }

    register = async (navigate: NavigateFunction, email:string, password: string) => {
        await userEndpoints.register(new Client().axiosInstance, { email, password })
            .then( response => {
                if (response?.user) {
                    const email = response.user.email
                    navigate('/registration-letter-sent', { state: { email } })
                }
        } )
        return false
    }

    login = async (navigate: NavigateFunction, email:string, password: string) => {
        await userEndpoints.login(new Client().axiosInstance, { email, password })
            .then( response => {
                if (response?.accessToken) {
                    this.session.token = response.accessToken
                    sessionStorage.setItem('token', response.accessToken)
                    navigate('/')
                }
        } )
    }

    logout = async (navigate: NavigateFunction) => {
        await userEndpoints.logout(new Client().axiosInstance)
            .then( () => {
                this.session.token = null
                sessionStorage.removeItem('token')
                navigate('/login')
        } )
    }
}

export { SessionStore }