import { FormControl, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
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

export const ForgotPasswordPage = () => {
    const sessionStore = useContext(SessionStoreContext)
    return <ObservedForgotPasswordPage  sessionStore={sessionStore}/>
}

const ObservedForgotPasswordPage = observer(( { sessionStore }: IProps ) => {
    const appName:string = import.meta.env.VITE_APPLICATION_NAME?.toUpperCase()
    const navigate = useNavigate();
    const [isByEmail, setIsByEmail] = useState(true)
    const [result, setResult] = useState({
        isSuccess: false,
        message: ''
    })

    const formik = useFormik({
        initialValues: {
          email: undefined,
          login: undefined,
        },
        validationSchema: Yup.object({
          email: isByEmail ? Yup.string().email('Неверный адрес электронной почты').required('Обязательное поле') : Yup.string(),
          login: isByEmail ? Yup.string() : Yup.string().required('Обязательное поле'),
        }),
        onSubmit: async values => {
            const result = await sessionStore?.forgot(values.email, values.login)
            if (result?.success) {
                setResult({
                    isSuccess: result?.success,
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
                            <div className='mb-2'>
                                {result.isSuccess ?
                                <>
                                    <div className='text-center font-sans'>
                                        Письмо с инструкцией по восстановлению отправлено на почту, указанную при регистрации
                                    </div>
                                </> :
                                <>
                                    <FormControl variant="filled" sx={{width: '100%'}} >
                                        {isByEmail ?
                                        <div>
                                            <TextField
                                                sx={{width: '100%'}}
                                                inputProps={{style: {fontSize: '12px'}}} // font size of input text
                                                placeholder='Адрес электронной почты'
                                                type='email'
                                                id="email"
                                                size='small'
                                                error={formik.touched.email && formik.errors.email ? true : false}
                                                {...formik.getFieldProps('email')}
                                            />
                                                <Collapse
                                                    in={ (formik.touched.email && formik.errors.email) ? true : false}>
                                                    <Alert severity="error" sx={{height: 'auto', padding: '0px 5px 0px 5px', fontSize: '12px'}}>
                                                        {formik.errors.email}
                                                    </Alert>
                                                </Collapse>
                                        </div> :
                                        <div>
                                            <TextField
                                                inputProps={{style: {fontSize: '12px'}}} // font size of input text
                                                sx={{width: '100%'}}
                                                placeholder='Логин'
                                                type='text'
                                                id="login"
                                                size='small'
                                                error={formik.touched.login && formik.errors.login ? true : false}
                                                {...formik.getFieldProps('login')}
                                            />
                                                <Collapse
                                                    in={ (formik.touched.login && formik.errors.login) ? true : false}>
                                                    <Alert severity="error" sx={{height: 'auto', padding: '0px 5px 0px 5px', fontSize: '12px'}}>
                                                        {formik.errors.login}
                                                    </Alert>
                                                </Collapse>
                                        </div>}
                                    </FormControl>
                                </>}

                            </div>
                            <div className='mb-8'>
                                {result.isSuccess ?
                                <>
                                </> :
                                <>
                                    <span className='text-xs underline-offset-2 decoration-1 underline decoration-gray-400 text-gray-400 hover:cursor-pointer active:text-gray-600'
                                        onClick={() => {
                                            formik.setFieldValue('login', undefined)
                                            formik.setFieldValue('email', undefined)
                                            setIsByEmail(!isByEmail)}
                                        }>
                                    {isByEmail ? 'Я помню логин' : 'Я помню адрес электронной почты'}</span>
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
                                        : <>Сбросить</> }</button>
                                    </>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
});

