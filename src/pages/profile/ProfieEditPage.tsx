import { AuthButton, useAbortController } from 'entities/session';
import { observer } from 'mobx-react-lite';
import { useInitProfile } from './model/useInitProfile';
import { CircularLoader } from 'shared/ui/loaders/CircularLoader';
import { ProfileStore } from 'entities/profile';
import { EditAvatarItem } from 'features/profile/EditAvatarItem';
import { useEffect, useState } from 'react';
import { Alert, Input, TextField } from '@mui/material';
import type { TPersonalData } from "shared/api/lbc-server/endpoints/types/personal";
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

export const ProfileEditPage = () =>  {
    const { profileStore, avatarFile } = useInitProfile()
    useAbortController([profileStore])

    if (!profileStore) return
    if (profileStore.client.isLoading) return <CircularLoader/>

    return <ObservedProfileEditPage profileStore={profileStore} avatarFile={avatarFile}/>
}

interface IProps {
    profileStore: ProfileStore,
    avatarFile: File | undefined
}

type Tpersonalitem = {
    name: string,
    type: keyof Omit<TPersonalData, 'userId'>
}

const ObservedProfileEditPage = observer( ( {profileStore, avatarFile}: IProps ) => {
    const navigate = useNavigate()
    const [validationErrorText, setValidationErrorText] = useState('')
    const [_avatarFile, setAvatarFile] = useState<File | undefined>(avatarFile)
    const [personalData, setPersonalData] = useState< Omit<TPersonalData, 'userId'>>({
        birthDate: '',
        fatherName: '',
        firstName: '',
        lastName: ''
    })

    useEffect(() => {
        if (!profileStore.personalData) return

        const { firstName, lastName, fatherName, birthDate } = profileStore.personalData

        setPersonalData({
            firstName,
            lastName,
            fatherName,
            birthDate: birthDate ?? ''
        })

    }, [])

    if (!personalData) return

    const personalItems: Tpersonalitem[] = [
        { name: 'Имя', type: 'firstName' },
        { name: 'Фамилия', type: 'lastName' },
        { name: 'Отчество', type: 'fatherName' },
        { name: 'Дата рождения', type: 'birthDate' },
    ]

    const handleChange = (type: keyof Omit<TPersonalData, 'uderId'>, value: string | undefined | null) => {
        setValidationErrorText('')

        if (value && value.length > 20) return

        setPersonalData( (prev) => {
            return {
                ...prev,
                [type]: value,
            }
        })
    }

    const handleAccept = async () => {
        if (validate() === false) return

        profileStore.updatePersonalData( {
            ...personalData,
        } )
            .then(async response => {
                return response?.isError === false ?
                    profileStore.updateUserAvatar(_avatarFile) : undefined
            })
            .then(async response => {
                if (response?.isError === false) {
                    navigate(-1)
                }
            })
    }

    const validate = () => {
        const { firstName, lastName, fatherName, birthDate } = personalData

        if (isValidString(firstName) === false) {
            setValidationErrorText('Неверное имя')
            return false
        }

        if (isValidString(lastName) === false) {
            setValidationErrorText('Неверная фамилия')
            return false
        }

        if (isValidString(fatherName) === false) {
            setValidationErrorText('Неверное отчество')
            return false
        }

        if (isValidDate(birthDate) === false) {
            setValidationErrorText('Неверная дата рождения')
            return false
        }

        return true
    }

    const handleCancel = async () => {
        navigate(-1)
    }

    function isValidString(string: any) {
        if (string === '') true

        return /^[а-яА-Я]+$/.test(string)
    }

    function isValidDate(dateString: any) {
        if (dateString === '') return true

        // Check if the input string matches the YYYY-MM-DD format using a regular expression
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) {
          return false;
        }

        // Parse the date parts to integers
        const parts = dateString.split("-");
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        // Check if the year, month, and day are valid
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
          return false;
        }
        if (month < 1 || month > 12) {
          return false;
        }
        if (day < 1 || day > 31) {
          return false;
        }

        // Check for months with fewer than 31 days
        if ([4, 6, 9, 11].includes(month) && day === 31) {
          return false;
        }

        // Check for February and leap years
        if (month === 2) {
          const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
          if (day > 29 || (day === 29 && !isLeapYear)) {
            return false;
          }
        }

        // The date is valid
        return true;
    }

    return(
        <>
            <div className='p-4 w-full pb-20'>
                <div className='flex items-center gap-2 mb-4'>
                    <div className='text-md font-bold text-gray-500 flex-auto'>Редактирование профиля</div>
                </div>
                <div className='mb-4'>
                    <div className='flex gap-2 p-1 items-center'>
                        <div className='max-w-[85px] text-gray-500'>Выберите аватар</div>
                        <EditAvatarItem avatarFile={_avatarFile} setAvatarFile={setAvatarFile}/>
                    </div>
                </div>
                <div className='flex flex-col gap-4 mb-6'>
                    <div className='flex items-center'>
                        <div className='h-[1px] bg-gray-200 w-full'></div>
                        <div className='text-center text-gray-400 px-2'>Персональные данные</div>
                        <div className='h-[1px]  bg-gray-200 w-full'></div>
                    </div>
                    {personalItems.map( (item, index) =>
                        <div className='flex items-center gap-2' key={index}>
                            <div className='text-gray-500 text-md min-w-[25%] max-w-[25%]'>
                               {item.name}
                            </div>
                            {/* ? item.value.split('-').reverse().join('.') : '' */}
                            {item.type === 'birthDate' ?
                             <InputMask className='p-2 w-full' mask='9999-99-99' value={personalData[item.type]} onChange={(e) => handleChange(item.type as any, e.target.value)}>
                            </InputMask> :
                            <InputMask className='p-2 w-full' mask='' value={personalData[item.type]} onChange={(e) => handleChange(item.type as any, e.target.value)}>
                            </InputMask>}
                        </div>
                    )}
                </div>
                <div className='mb-4'>
                    {validationErrorText === '' ? null :
                        <Alert
                            severity="error">
                            {validationErrorText}
                        </Alert>
                    }
                </div>
                <div className="flex justify-start gap-4">
                        <button
                            className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600'
                            onClick={handleAccept}>
                            Сохранить
                        </button>
                        <button
                            className='border-blue-400 border-[1px] drop-shadow-sm rounded-lg p-2 w-32 text-center text-blue-400 hover:border-blue-500 active:border-blue-600'
                            onClick={handleCancel}>
                            Отмена
                        </button>
                </div>
            </div>

        </>
    )
})