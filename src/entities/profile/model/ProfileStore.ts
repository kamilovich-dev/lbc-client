import { makeAutoObservable, runInAction } from "mobx";
import { Client } from "shared/api/lbc-server";
import { personalEndpoints, userEndpoints } from "shared/api/lbc-server";
import type { TPersonalData } from "shared/api/lbc-server/endpoints/types/personal";
import { TUser } from "shared/api/lbc-server/endpoints/types/user";
import { ApiSuccess } from "shared/api/lbc-server/ui/ApiSuccess";

export class ProfileStore {

    client: Client
    user: TUser | undefined = undefined
    personalData: TPersonalData | undefined = undefined

    constructor() {
        makeAutoObservable(this)
        this.client = new Client()
    }

    refreshPersonalData = async () => {
        return personalEndpoints.getPersonalData(this.client)
            .then(response => {
                if (response?.isError === false) {
                    runInAction(() => this.personalData = response.personalData)
                }
            })
    }

    refreshUserData = async () => {
        return userEndpoints.getUser(this.client)
            .then(response => {
                if (response?.isError === false) {
                    runInAction(() => {
                        this.user = response.user
                        if (this.user?.avatarUrl) this.user.avatarUrl = `${import.meta.env.VITE_LBC_SERVER_STATIC_URL}/${this.user.avatarUrl}`
                    })
                }
            })
    }

    updatePersonalData = async ( data: Omit<TPersonalData, 'userId'> ) => {
        return personalEndpoints.updatePersonalData(this.client, data)
            .then(response => {
                if (response?.isError === false) {
                    this.client.renderMessage(ApiSuccess, 'Успешно')
                }
                return response
            })
    }

    updateUserAvatar = async ( avatarFile: File | undefined ) => {

        const formData = new FormData()

        if (!avatarFile) formData.append('avatarUrl', '')
        if (avatarFile) formData.append('avatarFile', avatarFile)

        console.log('FORMDATA', avatarFile)

        return userEndpoints.updateAvatar(this.client, formData as any)
            .then(response => {
                if (response?.isError === false) {
                    this.client.renderMessage(ApiSuccess, 'Аватар обновлен')
                }
                return response
            })
    }

}