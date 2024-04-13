import Avatar from '@mui/material/Avatar';
import { AuthButton, useAbortController } from 'entities/session';
import { observer } from 'mobx-react-lite';
import { useInitProfile } from './model/useInitProfile';
import { CircularLoader } from 'shared/ui/loaders/CircularLoader';
import { ProfileStore } from 'entities/profile';
import { useNavigate } from 'react-router-dom';
import { routePaths } from 'shared/config';

export const ProfilePage = () =>  {
    const { profileStore } = useInitProfile()

    useAbortController([profileStore])

    if (!profileStore) return
    if (profileStore.client.isLoading) return <CircularLoader/>

    return <ObservedProfilePage profileStore={profileStore}/>
}

interface IProps {
    profileStore: ProfileStore,
}

const ObservedProfilePage = observer( ( {profileStore}: IProps ) => {

    const navigate = useNavigate()

    if (!profileStore.user || !profileStore.personalData) return

    const { avatarUrl, login, email } = profileStore.user
    const { firstName, lastName, fatherName, birthDate } = profileStore.personalData

    const authItems = [
        { name: 'E-mail', value: email },
        { name: 'Логин', value: login }
    ]

    const personalItems = [
        { name: 'Имя', value: firstName },
        { name: 'Фамилия', value: lastName },
        { name: 'Отчество', value: fatherName },
        { name: 'Дата рождения', value: birthDate },
    ]

    const handleChangeClick = () => {
        navigate(routePaths.PROFILE_EDIT)
    }

    return(
        <>
            <div className='p-4 w-full pb-20'>
                <div className='flex items-center gap-2 mb-2'>
                    <div className='text-md font-bold text-gray-500 flex-auto'>Данные пользователя</div>
                    <div className=''>
                        <AuthButton/>
                    </div>
                </div>
                     <div className='mb-4'>
                        <div className='flex gap-2 p-1 items-center justify-center '>
                            <div>
                            {avatarUrl ?
                                <div className='w-[100px] h-[100px] rounded-full overflow-hidden border-blue-200 border-[1px] '>
                                    <img className='w-full h-full object-cover' src={avatarUrl} />
                                </div>
                                :
                                <div>
                                    <Avatar alt="User's avatar" sx={{ width: 100, height: 100, fontSize: 60}}>
                                        {login ? login[0] : '?'}
                                    </Avatar>
                                </div>}
                            </div>
                        </div>
                    </div>
                <div className='flex flex-col gap-4 mb-12'>
                    <div className='flex items-center'>
                        <div className='h-[1px] bg-gray-200 w-full'></div>
                        <div className='text-center text-gray-400 px-2'>Авторизация</div>
                        <div className='h-[1px]  bg-gray-200 w-full'></div>
                    </div>
                    {authItems.map( (item, index) =>
                        <div className='flex items-center gap-2 overflow-auto' key={index}>
                            <div className='text-gray-500 text-md min-w-[25%] max-w-[25%]'>
                               {item.name}
                            </div>
                            <div className='bg-gray-200 text-gray-500 flex items-center p-3 rounded-lg flex-auto min-h-[45px]'>
                                {item.value}
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-4 mb-6'>
                    <div className='flex items-center'>
                        <div className='h-[1px] bg-gray-200 w-full'></div>
                        <div className='text-center text-gray-400 px-2'>Персональные данные</div>
                        <div className='h-[1px]  bg-gray-200 w-full'></div>
                    </div>
                    {personalItems.map( (item, index) =>
                        <div className='flex items-center gap-2  overflow-auto' key={index}>
                            <div className='text-gray-500 text-md min-w-[25%] max-w-[25%]'>
                               {item.name}
                            </div>
                            <div className='bg-gray-200 text-gray-500 flex items-center p-3 rounded-lg flex-auto min-h-[45px]'>
                                {item.value}
                            </div>
                        </div>
                    )}
                </div>
                <button className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600'
                    onClick={handleChangeClick}>Изменить</button>
            </div>

        </>
    )
})