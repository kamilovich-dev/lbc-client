import {  makeAutoObservable} from "mobx";
import { TokenStorage } from "shared/api/lbc-server";
import { Client, userEndpoints } from "shared/api/lbc-server";
import { TLoginReturn, TRegisterReturn } from "shared/api/lbc-server/endpoints/types/user";

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
        this.initSession()
        this.client = new Client()
    }

    initSession = () => {
        this.session.isAuth =  TokenStorage.getToken() ? true : false
        if (this.session.isAuth) this.setTokenCheckTimer()
    }

    setTokenCheckTimer = () => {
        this.checkTokenlTimerId = setInterval(this.checkToken, this.CHECK_TOKEN_INTERVAL)
    }

    checkToken = async () => {
        console.log('checking token')
        const token = TokenStorage.getToken()
        if (!token && this.session.isAuth) {
            await this.logout()
            this.session.isAuth = false
        }
    }

    register = async (email:string, password: string):Promise<TRegisterReturn> => {
        return await userEndpoints.register(this.client, { email, password })
    }

    login = async (email:string, password: string): Promise<TLoginReturn> => {
        return await userEndpoints.login(this.client, { email, password })
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
}

export { SessionStore }