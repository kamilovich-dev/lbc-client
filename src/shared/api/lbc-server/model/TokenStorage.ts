export class TokenStorage {

    static tokenName: string = 'token'

    constructor() {
    }

    static setToken = (tokenValue: string) => {
        localStorage.setItem(this.tokenName, tokenValue)
    }

    static getToken = (): string | null => {
        return localStorage.getItem(this.tokenName)
    }

    static removeToken = () => {
        localStorage.removeItem(this.tokenName)
    }

}