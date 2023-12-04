import { InputLabel, Input, FormControl, Button, Alert } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from 'entities/session';


const LoginForm = () => {
    const sessionStore = useSessionStore();
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
            await sessionStore?.login(navigate, values.email, values.password)
        },
    });

    return (
        <>
            <div className='flex justify-center p-5'>
                <button className='flex p-2 gap-2 absolute top-2 left-4 bg-[#4F81BD] hover:bg-sky-700 active:bg-sky-800 w-[100px] h-[30px] text-white text-sm py-[5px] font-semibold rounded-lg shadow-md'
                    onClick={() => navigate(-1)}>
                    <UndoIcon/>
                    Назад
                </button>
                <form className='flex relative rounded-2xl shadow-xl bg-white h-[500px] w-[600px]'
                    onSubmit={formik.handleSubmit}>
                    <div className='left-[-80px] top-[45px] absolute -rotate-90 text-3xl font-bold text-gray-700 drop-shadow-md'>Picturize</div>
                    <div className='w-full h-full'>
                        <div className='w-full h-full'>
                            <img src="/static/landing/login.png" className='w-full h-full'></img>
                        </div>
                    </div>
                    <div className='w-full flex flex-col pt-8 pl-6 pr-6 pb-4'>
                        <div className='mb-8 text-gray-700 text-2xl font-bold'>Пожалуйста, авторизуйтесь</div>
                        <div className='mb-8 w-[30px] h-[3px] bg-gray-200'></div>
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
                        <div className='mb-8'>
                            <span className='text-xs underline-offset-2 decoration-1 underline decoration-gray-400 text-gray-400 hover:cursor-pointer active:text-gray-600'>
                                Забыли пароль?</span>
                        </div>
                        <div className='flex-auto'>
                            <button className='bg-sky-600 hover:bg-sky-700 active:bg-sky-800 w-full text-white text-sm py-[5px] font-semibold rounded-lg shadow-md'
                                onClick={formik.submitForm}>
                                Войти</button>
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
};

export { LoginForm };