import { makeAutoObservable, observable, action } from "mobx";
import type { NavigateFunction } from 'react-router-dom';
import { Client, userEndpoints } from "shared/api/lbc-server";
import { routePaths } from "shared/config";

class SessionStore {

    session = {  isAuth: false }
    client: Client

    constructor() {
        makeAutoObservable(this);
        this.initSession()
        this.client = new Client(this.logout)
    }

    initSession = () => {
        this.session.isAuth = localStorage.getItem('token') ? true : false
    }

    register = async (navigate: NavigateFunction, email:string, password: string) => {
        await userEndpoints.register(this.client, { email, password })
            .then( response => {
                if (response?.user) {
                    const email = response.user.email
                    navigate(routePaths.REGISTRATION_LETTER_SENT, { state: { email } })
                }
        } )
    }

    login = async (navigate: NavigateFunction, email:string, password: string) => {
        await userEndpoints.login(this.client, { email, password })
            .then( response => {
                if (response?.accessToken) {
                    this.session.isAuth = true
                    localStorage.setItem('token', response.accessToken)
                    navigate(routePaths.MODULES)
                }
        } )
    }

    logout = async (navigate?: NavigateFunction) => {
        this.session.isAuth = false
        localStorage.removeItem('token')
        if (navigate) navigate(routePaths.LOGIN)
        await userEndpoints.logout(this.client)
    }
}

export { SessionStore }