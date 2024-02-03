import { FormControl, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { routePaths } from 'shared/config';

import { SessionStoreContext } from 'entities/session';

interface IProps {
    appName: string | undefined
}

const RegistrationForm = ( { appName }: IProps) => {
    const sessionStore = useContext(SessionStoreContext)
    const navigate = useNavigate();

    if (!sessionStore) return

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Неверный email-адрес').required('Обязательное поле'),
          password: Yup.string()
            .required('Обязательное поле')
        }),
        onSubmit: async values => {
            const result = await sessionStore.register(values.email, values.password)
            if (result?.user) navigate(routePaths.REGISTRATION_LETTER_SENT, { state: { email: result.user.email } })
        },
    });


    return (
        <>
        <div className='flex flex-col w-[400px] justify-center items-center p-4 md-max:pt-20 md-max:w-[320px]'>
                <button className='flex p-2 gap-2 absolute top-2 left-4 bg-[#4F81BD] hover:bg-sky-700 active:bg-sky-800 w-[100px] h-[30px] text-white text-sm py-[5px] font-semibold rounded-lg shadow-md'
                    onClick={() => navigate(-1)}>
                    <UndoIcon/>
                    Назад
                </button>
                <form className='flex flex-col relative rounded-2xl shadow-xl bg-white h-auto w-full '
                    onSubmit={formik.handleSubmit}>
                    <div className='left-[-110px] top-[70px] absolute -rotate-90 text-3xl font-bold text-gray-700 drop-shadow-md md-max:text-sm md-max:left-0 md-max:rotate-0 md-max:top-[-22px]'>{appName}</div>
                    <div className='w-full flex flex-col pt-8 pl-8 pr-8 pb-8'>
                        <div className='mb-6 text-gray-700 text-3xl font-bold text-center md-max:text-sm md-max:mb-4'>Создать аккаунт</div>
                        <div className='flex items-center justify-center mb-8 md-max:mb-4'>
                            <div className='w-[60px] h-[60px]'>
                                <img src="/static/landing/registration.png" className='w-full h-full'></img>
                            </div>
                        </div>
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
                        <div className='mb-8 flex-auto md-max:mb-4'>
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
                        <div className=''>
                            <button className='bg-sky-600 hover:bg-sky-700 active:bg-sky-800 w-full text-white text-sm py-[5px] font-semibold rounded-lg shadow-md'
                                type='submit'>
                                Создать
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export { RegistrationForm };