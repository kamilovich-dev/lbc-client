import { ProfileStore } from "entities/profile"
import { useEffect, useState } from "react"

type TInitProfile = {
    profileStore: ProfileStore | undefined,
    avatarFile: File | undefined
}

export const useInitProfile = () => {

    const [initProfileData, setInitProfileData] = useState<TInitProfile>({ profileStore: undefined, avatarFile: undefined })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const profileStore = new ProfileStore()
        await Promise.all([profileStore.refreshPersonalData(), profileStore.refreshUserData()])

        const avatarFile = await fetchAvatar(profileStore.user?.avatarUrl)

        setInitProfileData({
            profileStore,
            avatarFile
        })
    }

    const fetchAvatar = async ( avatarUrl: string | undefined ): Promise<File | undefined> => {
        if (avatarUrl) {
            try {
                const format = avatarUrl.slice(avatarUrl.lastIndexOf('.') + 1)
                const blob = await fetch(avatarUrl).then(result => result.blob())
                const file = new File([blob], `avatar.${format}`, {type: `image/${format}`})
                return file
            } catch(e) {
                console.log(`Ошибка при попытке сформировать файл аватара по ссылке ${avatarUrl}`)
            }
        }
    }

    return initProfileData
}