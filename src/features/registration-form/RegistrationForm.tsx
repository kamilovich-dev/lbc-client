import { InputLabel, Input, FormControl, Button, Alert } from '@mui/material';
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

                    <div className='mb-4'>
                        <Button type="submit" variant="contained">Зарегестрироваться</Button>
                    </div>

                    <div>
                        <Button variant="outlined" onClick={ () => navigate('/login') }>Авторизация</Button>
                    </div>
                </form>

            </div>

        </>
    );
};

export { RegistrationForm };