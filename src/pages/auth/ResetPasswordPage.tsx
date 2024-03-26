import { FormControl, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import { useContext, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import { routePaths } from 'shared/config';

import { SessionStore, SessionStoreContext } from 'entities/session';

interface IProps {
    sessionStore: SessionStore | null,
}

export const ResetPasswordPage = () => {
    const sessionStore = useContext(SessionStoreContext)
    return <ObservedResetPasswordPage  sessionStore={sessionStore}/>
}

const ObservedResetPasswordPage = observer(( { sessionStore }: IProps ) => {
    const appName:string = import.meta.env.VITE_APPLICATION_NAME?.toUpperCase()
    const [searchParams, setSearchParams] = useSearchParams()

    const email = searchParams.get('email')
    const token = searchParams.get('token')

    if (!email || !token) return

    const navigate = useNavigate();
    const [result, setResult] = useState({
        isSuccess: false,
        message: ''
    })

    const formik = useFormik({
        initialValues: {
          password: undefined,
          passwordRepeat: undefined,
        },
        validate: (values) => {
            const errors = {} as any
            if (!values.password) errors.password = 'Обязательное поле'
            if (!values.passwordRepeat) errors.passwordRepeat = 'Обязательное поле'
            if (values.password && values.passwordRepeat) {
                if (values.password !== values.passwordRepeat) {
                    errors.passwordRepeat = 'Пароли не совпадают'
                }
            }

            return errors
        },
        onSubmit: async values => {
            const result = await sessionStore?.reset(email, values.password!, token)
            if (result?.success) {
                setResult({
                    isSuccess: true,
                    message: result.message
                })
            }
        },
    });

    return (
        <>
            <div className='flex items-center justify-center flex-auto bg-slate-100'>
                <div className='p-4 md-max:pt-20 md-max:w-[320px]'>
                    <form className='flex relative rounded-2xl shadow-xl bg-white h-[500px] w-[600px] md-max:h-[auto] md-max:w-full md-max:flex-col'
                        onSubmit={formik.handleSubmit}>
                        <div className='left-[-110px] top-[70px] absolute -rotate-90 text-3xl font-bold text-gray-700 drop-shadow-md md-max:text-sm md-max:left-0 md-max:rotate-0 md-max:top-[-20px]'>
                            {appName}
                        </div>
                        <div className='w-full h-full md-max:h-[80px] overflow-hidden md-max:rounded-t-xl bg-no-repeat bg-cover'>
                            <img src="/static/landing/login.png" className='w-full h-full md-max:h-auto md-max:-top-40 relative'></img>
                        </div>
                        <div className='w-full flex flex-col pt-8 pl-6 pr-6 pb-4 md-max:pt-4'>
                            <div className='mb-8 text-gray-700 text-2xl font-bold md-max:text-sm md-max:mb-4'>
                                {result.isSuccess ?
                                'Проверьте почту!'
                                : 'Сброс пароля'}</div>
                            <div className='mb-8 w-[30px] h-[3px] bg-gray-200 md-max:mb-4'></div>
                            <div className='mb-8'>
                                {result.isSuccess ?
                                <>
                                    <div className='text-center font-sans'>
                                        Пароль успешно обновлен!
                                    </div>
                                </> :
                                <>
                                    <FormControl variant="filled" sx={{width: '100%'}} >
                                        <div className='mb-8'>
                                            <TextField
                                                sx={{width: '100%'}}
                                                inputProps={{style: {fontSize: '12px'}}} // font size of input text
                                                placeholder='Пароль'
                                                type='text'
                                                id="password"
                                                size='small'
                                                error={formik.touched.password && formik.errors.password ? true : false}
                                                {...formik.getFieldProps('password')}
                                            />
                                                <Collapse
                                                    in={ (formik.touched.password && formik.errors.password) ? true : false}>
                                                    <Alert severity="error" sx={{height: 'auto', padding: '0px 5px 0px 5px', fontSize: '12px'}}>
                                                        {formik.errors.password}
                                                    </Alert>
                                                </Collapse>
                                        </div>
                                        <div>
                                            <TextField
                                                inputProps={{style: {fontSize: '12px'}}} // font size of input text
                                                sx={{width: '100%'}}
                                                placeholder='Повторите пароль'
                                                type='text'
                                                id="passwordRepeat"
                                                size='small'
                                                error={formik.touched.passwordRepeat && formik.errors.passwordRepeat ? true : false}
                                                {...formik.getFieldProps('passwordRepeat')}
                                            />
                                                <Collapse
                                                    in={ (formik.touched.passwordRepeat && formik.errors.passwordRepeat) ? true : false}>
                                                    <Alert severity="error" sx={{height: 'auto', padding: '0px 5px 0px 5px', fontSize: '12px'}}>
                                                        {formik.errors.passwordRepeat}
                                                    </Alert>
                                                </Collapse>
                                        </div>
                                    </FormControl>
                                </>}
                            </div>
                            <div className='flex-auto'>
                                    {result.isSuccess ?
                                    <>
                                        <button className='bg-sky-600 hover:bg-sky-700 active:bg-sky-800 w-full text-white text-sm py-[5px] font-semibold rounded-lg shadow-md flex justify-center'
                                            onClick={() => navigate(routePaths.MODULES)}>
                                        {sessionStore?.client.isLoading ?
                                            <CircularProgress  sx={{color: 'white'}} size="20px"/>
                                        : <>Вернуться на главную</> }</button>
                                    </> :
                                    <>
                                        <button className='bg-sky-600 hover:bg-sky-700 active:bg-sky-800 w-full text-white text-sm py-[5px] font-semibold rounded-lg shadow-md flex justify-center'
                                            type='submit'>
                                        {sessionStore?.client.isLoading ?
                                            <CircularProgress  sx={{color: 'white'}} size="20px"/>
                                        : <>Сохранить</> }</button>
                                    </>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
});
