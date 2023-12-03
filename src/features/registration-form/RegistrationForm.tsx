import { InputLabel, Input, FormControl, Button, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from 'entities/session';

const RegistrationForm = () => {
    const sessionStore = useSessionStore();
    const navigate = useNavigate();

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
            await sessionStore?.register(navigate, values.email, values.password)
        },
    });


    return (
        <>
        <div className='flex justify-center p-5'>
                <form className='flex relative rounded-2xl shadow-xl bg-white h-auto w-[400px]'
                    onSubmit={formik.handleSubmit}>
                    <div className='left-[-82px] top-[45px] absolute -rotate-90 text-3xl font-bold text-gray-700 drop-shadow-md'>Picturize</div>

                    <div className='w-full flex flex-col pt-8 pl-8 pr-8 pb-8'>
                        <div className='mb-6 text-gray-700 text-3xl font-bold text-center'>Создать аккаунт</div>
                        <div className='flex items-center justify-center mb-8 '>
                            <div className='w-[60px] h-[60px]'>
                                <img src="/static/landing/registration.png" className='w-full h-full'></img>
                            </div>
                        </div>
                        <div className='mb-8'>
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
                        <div className='mb-8 flex-auto'>
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
                                onClick={formik.submitForm}>
                                Создать
                            </button>
                        </div>
                    </div>
                </form>
            </div>
{/*
            <div className='flex justify-center p-5'>
                <form className='flex flex-col p-10 border-2 rounded-md border-blue-100 shadow-sm'
                    onSubmit={formik.handleSubmit}>
                    <div className='mb-12 text-gray-500 text-lg font-bold'>Регистрация пользователя</div>
                    <div className='mb-12 flex items-center'>
                        <FormControl variant="standard" sx={{width: '250px'}} >
                            <InputLabel shrink htmlFor="email">
                                Email
                            </InputLabel>
                            <Input
                                type='email'
                                id="email"
                                size='small'
                                error={formik.touched.email && formik.errors.email ? true : false}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ?
                                 <Alert severity="error" sx={{height: '40px', padding: '0 5px 0px 5px'}}>
                                    {formik.errors.email}
                                </Alert> : null}
                        </FormControl>
                    </div>

                    <div className='mb-12 flex items-center'>
                        <FormControl variant="standard" sx={{width: '250px'}}>
                            <InputLabel shrink htmlFor="password">
                                Пароль
                            </InputLabel>
                            <Input
                                type='text'
                                id="password"
                                size='small'
                                error={formik.touched.password && formik.errors.password ? true : false}
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ?
                                 <Alert severity="error" sx={{height: '40px', padding: '0 5px 0px 5px'}}>
                                    { formik.errors.password}
                                </Alert> : null}
                        </FormControl>
                    </div>

                     <div className='flex gap-2'>
                        <div className='flex-auto'><Button type="submit" variant="contained">Зарегестрироваться</Button></div>
                        <div><Button variant="outlined" onClick={ () => navigate('/login') }>Авторизация</Button></div>
                     </div>

                </form>

            </div> */}

        </>
    );
};

export { RegistrationForm };