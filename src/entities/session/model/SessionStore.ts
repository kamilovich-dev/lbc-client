import { makeObservable, observable, action } from "mobx";
import { ISessionStore, TSession } from './types';
import type { NavigateFunction } from 'react-router-dom';
import { Client, userEndpoints, IClient } from "shared/api/lbc-server";

class SessionStore implements ISessionStore {

    session: TSession = {
        isAuth: false
    }
    client: IClient

    constructor() {
        makeObservable(this, {
            session: observable,
            login: action,
            logout: action,
        })
        this.initSession()
        this.client = new Client()
    }

    initSession = () => {
        this.session.isAuth = localStorage.getItem('token') ? true : false
    }

    register = async (navigate: NavigateFunction, email:string, password: string) => {
        await userEndpoints.register(this.client, { email, password })
            .then( response => {
                if (response?.user) {
                    const email = response.user.email
                    navigate('/registration-letter-sent', { state: { email } })
                }
        } )
    }

    login = async (navigate: NavigateFunction, email:string, password: string) => {
        await userEndpoints.login(this.client, { email, password })
            .then( response => {
                if (response?.accessToken) {
                    this.session.isAuth = true
                    localStorage.setItem('token', response.accessToken)
                    navigate('/')
                }
        } )
    }

    logout = async (navigate: NavigateFunction) => {
        await userEndpoints.logout(this.client)
            .then( () => {
                this.session.isAuth = false
                localStorage.removeItem('token')
                navigate('/login')
        } )
    }
}

export { SessionStore }