import { FormControl, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import { routePaths } from 'shared/config';

import { SessionStore, SessionStoreContext } from 'entities/session';

interface IOuterProps {
    appName: string | undefined
}

interface IInnerProps {
    sessionStore: SessionStore | null,
    appName: string | undefined
}

const LoginForm = ( { ...props }: IOuterProps ) => {
    const sessionStore = useContext(SessionStoreContext)
    return <ObserverLoginForm  { ...{...props, sessionStore} }/>
}

const ObserverLoginForm = observer(( {appName, sessionStore}: IInnerProps ) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Неверный адрес электронной почты').required('Обязательное поле'),
          password: Yup.string()
            .required('Обязательное поле')
        }),
        onSubmit: async values => {
            const result = await sessionStore?.login(values.email, values.password)
            if (result?.user) navigate(routePaths.MODULES)
        },
    });

    return (
        <>
            <div className='flex justify-center p-4 md-max:pt-20 md-max:w-[320px]'>
                <button className='flex p-2 gap-2 absolute top-2 left-4 bg-[#4F81BD] hover:bg-sky-700 active:bg-sky-800 w-[100px] h-[30px] text-white text-sm py-[5px] font-semibold rounded-lg shadow-md md-max:shadow-sm'
                    onClick={() => navigate(-1)}>
                    <UndoIcon/>
                    Назад
                </button>
                <form className='flex relative rounded-2xl shadow-xl bg-white h-[500px] w-[600px] md-max:h-[auto] md-max:w-full md-max:flex-col'
                    onSubmit={formik.handleSubmit}>
                    <div className='left-[-110px] top-[70px] absolute -rotate-90 text-3xl font-bold text-gray-700 drop-shadow-md md-max:text-sm md-max:left-0 md-max:rotate-0 md-max:top-[-20px]'>{appName}</div>
                    <div className='w-full h-full md-max:h-[80px] overflow-hidden md-max:rounded-t-xl bg-no-repeat bg-cover'>
                        <img src="/static/landing/login.png" className='w-full h-full md-max:h-auto md-max:-top-40 relative'></img>
                    </div>
                    <div className='w-full flex flex-col pt-8 pl-6 pr-6 pb-4 md-max:pt-4'>
                        <div className='mb-8 text-gray-700 text-2xl font-bold md-max:text-sm md-max:mb-4'>Пожалуйста, авторизуйтесь</div>
                        <div className='mb-8 w-[30px] h-[3px] bg-gray-200 md-max:mb-4'></div>
                        <div className='mb-8 md-max:mb-4'>
                            <FormControl variant="filled" sx={{width: '100%'}} >
                                <TextField
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
                            </FormControl>
                        </div>
                        <div className='mb-2'>
                            <FormControl variant="standard" sx={{width: '100%'}}>
                                <TextField
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
                            </FormControl>
                        </div>
                        <div className='mb-8 md-max:mb-4'>
                            <span className='text-xs underline-offset-2 decoration-1 underline decoration-gray-400 text-gray-400 hover:cursor-pointer active:text-gray-600'
                                onClick={() => navigate(routePaths.FORGOT_PASSWORD)}>
                                Забыли пароль?</span>
                        </div>
                        <div className='flex-auto'>
                                <button className='bg-sky-600 hover:bg-sky-700 active:bg-sky-800 w-full text-white text-sm py-[5px] font-semibold rounded-lg shadow-md flex justify-center'
                                    type='submit'>
                                {sessionStore?.client.isLoading ?
                                    <CircularProgress  sx={{color: 'white'}} size="20px"/>

                                : <>Войти</> }</button>
                        </div>
                        <div>
                            <span className='text-xs text-gray-400'>Еще не зарегестрированы? </span>
                            <span className='text-xs text-gray-400 underline underline-offset-2 hover:cursor-pointer active:text-gray-600'
                                onClick={()=>navigate('/register')}>Зарегестрируйтесь</span>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
});

export { LoginForm };