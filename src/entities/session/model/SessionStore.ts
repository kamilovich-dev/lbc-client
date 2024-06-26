import {  makeAutoObservable} from "mobx";
import { TokenStorage } from "shared/api/lbc-server";
import { Client, userEndpoints } from "shared/api/lbc-server";

import { TLoginReturn, TRegisterReturn, TPasswordForgotReturn, TPasswordResetReturn, TUpdateAvatarReturn } from "shared/api/lbc-server/endpoints/types/user";

type TSession = {
    isAuth: boolean,
}

class SessionStore {

    session: TSession = {
        isAuth: false,
    }
    client: Client

    CHECK_TOKEN_INTERVAL = 3000
    checkTokenlTimerId: NodeJS.Timer | undefined = undefined

    constructor() {
        makeAutoObservable(this);
        this.client = new Client()
        this.initSession()
    }

    private initSession = () => {
        this.session.isAuth =  TokenStorage.getToken() ? true : false
        if (this.session.isAuth) {
            this.setTokenCheckTimer()
        }
    }

    private setTokenCheckTimer = () => {
        clearInterval(this.checkTokenlTimerId)
        this.checkTokenlTimerId = setInterval(this.checkToken, this.CHECK_TOKEN_INTERVAL)
    }

    private checkToken = async () => {
        console.log('checking token')
        const token = TokenStorage.getToken()
        if (!token && this.session.isAuth) await this.logout()
    }

    register = async (email:string, login:string,  password: string):Promise<TRegisterReturn> => {
        return await userEndpoints.register(this.client, { email, login, password })
    }

    login = async (password: string, email?:string, login?:string): Promise<TLoginReturn> => {
        return await userEndpoints.login(this.client, { email, login, password })
            .then( response => {
                if (response?.accessToken) {
                    TokenStorage.setToken(response.accessToken)
                    this.session.isAuth = true
                    this.setTokenCheckTimer()
                }
                return response
        } )
    }

    logout = async () => {
        clearInterval(this.checkTokenlTimerId)
        TokenStorage.removeToken()
        await userEndpoints.logout(this.client)
        this.session.isAuth = false
    }

    forgot = async(email?: string, login?: string): Promise<TPasswordForgotReturn> => {
        return await userEndpoints.passwordForgot(this.client, { email, login })
    }

    reset = async(email: string, password: string, token: string): Promise<TPasswordResetReturn> => {
        return await userEndpoints.passwordReset(this.client, { email, password, token })
    }

}

export { SessionStore }