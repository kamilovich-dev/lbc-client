import type { TError } from './error'

/*Получение персональных данных*/
export type TGetPersonalDataResponse ={
  personalData: TPersonalData
}
export type TGetPersonalDataReturn = (TGetPersonalDataResponse & TError) | undefined

/*Обновление персональных данных*/
export type TUpdatePersonalDataPayload = Omit<TPersonalData, 'userId'>
export type TUpdatePersonalDataResponse ={
    personalData: TPersonalData
}

export type TUpdatePersonalDataReturn = (TUpdatePersonalDataResponse & TError) | undefined

export type TPersonalData = {
    userId: number,
    firstName: string | undefined,
    lastName: string | undefined,
    fatherName: string | undefined,
    birthDate: string | undefined, //2011-10-05
}